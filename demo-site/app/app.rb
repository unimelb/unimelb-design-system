# encoding: utf-8

require_relative 'helpers'
require_relative 'section_filter'

module WebTemplates
  class App < Sinatra::Base

    ### Register addons

    register Sinatra::Partial

    ### Configure default paths

    set :root,           File.expand_path(File.join(File.dirname(__FILE__), '..'))
    set :views,          File.join(root, "views")
    set :public_dir,     File.join(root, "public")

    ### Partials

    set :partial_template_engine, :slim

    ### Web template paths
    set :project_root,   File.expand_path(File.join(root, '..'))
    set :injection,      File.join(project_root, 'injection')
    set :web_templates,  File.join(project_root, 'templates')
    set :components_dir, File.join(web_templates, 'components')
    set :components,     Dir.entries(components_dir).select { |f| f =~ /^[^\.]/ }
    set :layouts_dir,    File.join(root, 'views', 'example_layouts')
    set :layouts,        Dir.glob(File.join(layouts_dir, '*.slim')).map { |f| File.basename(f, '.slim') }
    set :pages_dir,      File.join(project_root, 'pages')
    set :temp_dir,       File.join(root, 'tmp')

    ### Sprockets settings

    set :sprockets,      Sprockets::Environment.new(root)
    set :assets_prefix,  '/assets'
    set :digest_assets,  true

    set :compass_gem_root, Gem.loaded_specs['compass'].full_gem_path # <-- TODO: this is not right

    configure do
      sprockets.append_path injection
      sprockets.append_path web_templates
      sprockets.append_path File.join(compass_gem_root, 'frameworks', 'compass', 'stylesheets') # <-- TODO: this is not right
      sprockets.cache = Sprockets::Cache::FileStore.new(File.join(root, 'tmp'))

      Sprockets::Helpers.configure do |config|
        config.environment = sprockets
        config.prefix      = assets_prefix
        config.digest      = digest_assets
        config.public_path = public_dir
      end
    end

    ## Helpers

    helpers Helpers
    helpers Sprockets::Helpers

    before do
      build_navigation

      @settings   = {
        'no_section_wrap' => false
      }
    end

    ### Homepage

    get '/' do
      @components = settings.components
      @layouts    = settings.layouts
      slim :index
    end

    ### Components

    get '/components' do
      @components = settings.components
      slim :components_index
    end

    get '/components/*' do |path|
      return_page_not_found unless settings.components.include? path

      @component = path

      @documents = []
      raw_documents = Dir.glob(File.join(settings.components_dir, path, '*.md')).sort
      raw_documents.map do |f|
        @settings.merge! file_settings(f)
        render_method = !!@settings['no_section_wrap'] ? :render_markdown : :render_markdown_with_section
        @documents << send(render_method, file_content(f))
      end

      slim :component
    end

    ### Layouts

    get '/layouts' do
      @layouts = settings.layouts
      slim :layouts_index
    end

    get '/layouts/*' do |path|
      return_page_not_found unless settings.layouts.include? path
      layout_view = "example_layouts/#{path}".to_sym
      @layout = true

      if request['view'].to_s.downcase == 'source'
        @file   = path
        @source = slim layout_view, layout: false, pretty: true
        @source = syntax_highlight(@source)
        return slim :source_view
      end

      if File.exist? (File.join settings.layouts_dir, path + '_layout.slim')
        slim layout_view, layout: "example_layouts/#{path}_layout".to_sym
      else
        slim layout_view
      end
    end

    ### Assets

    get "#{Sprockets::Helpers.prefix}/*" do |path|
      env_sprockets = request.env.dup
      env_sprockets['PATH_INFO'] = path
      settings.sprockets.call env_sprockets
    end

    ### Documentation pages

    get '/*' do
      view_name = params[:splat].first
      file  = File.join settings.pages_dir, "#{view_name}.md"
      index = File.join settings.pages_dir, "#{view_name}/index.md"
      file  = index unless File.exist?(file)

      if File.exist?(file)
        @settings.merge! file_settings(file)
        @content = render_markdown render_markdown file_content(file)
        return slim :page
      end

      return_page_not_found
    end

    private

    def doc_title(file)
      return '¡missing page!' unless File.file?(file)
      settings = file_settings(file)
      settings['title'] ? settings['title'] : 'Untitled'
    end

    def doc_href(file)
      file = file.gsub(/(index)?\.md/, '')
      file[settings.pages_dir.length, file.length]
    end

    def dir_to_menu(dir)
      pages = []

      Dir.entries(dir).each do |entry|
        next if entry =~ /^(\.|index)/
        path     = File.join(dir, entry)
        children = []

        if File.directory?(path)
          children = dir_to_menu(path)
          path     = File.join(path, 'index.md')
        end

        pages << {
          title:    doc_title(path),
          href:     doc_href(path),
          children: children
        }
      end

      pages
    end

    def build_navigation
      @navigation = dir_to_menu(settings.pages_dir)

      layouts = { title: 'Layouts', href: '/layouts', children: [] }
      settings.layouts.each do |layout|
        unless layout =~ /[layout]$/
          layouts[:children] << { title: layout_title(layout), href: layout_path(layout), children: [] }
        end
      end

      components = { title: 'Components', href: '/components', children: [] }
      settings.components.each do |component|
        components[:children] << { title: component_title(component), href: component_path(component), children: [] }
      end

      @navigation << layouts
      @navigation << components
    end

    def render_markdown(md)
      @pipeline ||= HTML::Pipeline.new [
        HTML::Pipeline::MarkdownFilter,
        HTML::Pipeline::SyntaxHighlightFilter
      ]
      (@pipeline.call(md))[:output].to_s
    end

    def render_markdown_with_section(md)
      @pipeline_with_section = HTML::Pipeline.new [
        HTML::Pipeline::MarkdownFilter,
        HTML::Pipeline::SyntaxHighlightFilter,
        SectionFilter
      ]
      (@pipeline_with_section.call(md))[:output].to_s
    end

    def syntax_highlight(html)
      Pygments.highlight(html, lexer: 'html')
    end

    def front_matter(file)
      @front_matters ||= {}
      unless @front_matters.has_key? file
        @front_matters[file] = FrontMatterParser.parse_file(file)
      end
      @front_matters[file]
    end

    def file_settings(file)
      front_matter(file).front_matter
    end

    def file_content(file)
      front_matter(file).content
    end

    def return_page_not_found
      status 404
      @message = 'Page not found.'
      slim :error
    end

  end
end
