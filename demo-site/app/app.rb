# encoding: utf-8

require_relative 'helpers'
require_relative 'section_filter'

module WebTemplates
  class App < Sinatra::Base
    ### Register addons

    register Sinatra::Partial

    ### Configure default paths

    set :root,           File.expand_path(File.join(File.dirname(__FILE__), '..'))
    set :views,          File.join(root, 'views')
    set :public_dir,     File.join(root, 'public')
    set :version,        'v1.0'

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

    set :compass_gem_root, Gem.loaded_specs['compass-core'].full_gem_path

    configure do
      sprockets.append_path injection
      sprockets.append_path web_templates
      sprockets.append_path File.join(compass_gem_root, 'stylesheets')
      sprockets.cache = Sprockets::Cache::FileStore.new(File.join(root, 'tmp'))

      # sprockets.js_compressor  = :uglify
      # sprockets.css_compressor = :scss

      Sprockets::Helpers.configure do |config|
        config.environment = sprockets
        config.prefix      = assets_prefix
        config.digest      = digest_assets
        config.public_path = public_dir
      end
    end

    AutoprefixerRails.install(sprockets)

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

    ### Forms standalone

    get '/forms' do
      @component = 'forms'

      @documents = {}
      raw_documents = []
      ['md', 'html', 'slim'].each do |ext|
        raw_documents << Dir.glob(File.join(settings.components_dir, @component, "*.#{ext}"))
      end
      raw_documents.flatten.sort.map do |f|
        section = File.basename(f)[0..1]

        case File.extname(f)
        when '.md' then
          @settings.merge! file_settings(f)
          render_method = !!@settings['no_section_wrap'] ? :render_markdown : :render_markdown_with_section
          if @documents[section]
            @documents[section] << send(render_method, file_content(f))
          else
            @documents[section] = [ send(render_method, file_content(f)) ]
          end

        when '.slim' then
          if basename_without_index_and_extension(f)[-9..-1] == 'no-source'
            source = ''
          else
            source = syntax_highlight(slim file_content(f), layout: false, pretty: true)
          end
          output = slim file_content(f), layout: false, pretty: true
          if @documents[section]
            @documents[section] << [ title_from_filename(f), source, output ]
          else
            @documents[section] = [ [ title_from_filename(f), source, output ] ]
          end

        else
          # Raw HTML
          if basename_without_index_and_extension(f)[-9..-1] == 'no-source'
            source = ''
          else
            source = syntax_highlight(file_content(f))
          end
          output = file_content(f)
          if @documents[section]
            @documents[section] << [ title_from_filename(f), source, output ]
          else
            @documents[section] = [ [ title_from_filename(f), source, output ] ]
          end
        end

      end

      slim :forms, layout: "forms_layout".to_sym
    end

    ### Components

    get '/components' do
      @components = settings.components
      slim :components_index
    end

    get '/components/*' do |path|
      if path.empty?
        @components = settings.components
        slim :components_index

      else
        return_page_not_found unless settings.components.include? path

        # Default title from dirname, can be overriden in frontmatter of first .md
        @settings['title'] = File.basename(path).capitalize

        @component = path

        # Determine next and previous links from dir array
        allcomps = settings.components.sort
        curr = allcomps.index(@component)
        @next = curr == allcomps.length - 1 ? allcomps[0] : allcomps[curr + 1]
        @prev = curr == 0 ? allcomps[allcomps.length - 1] : allcomps[curr - 1]

        @documents = {}
        raw_documents = []
        ['md', 'html', 'slim'].each do |ext|
          raw_documents << Dir.glob(File.join(settings.components_dir, path, "*.#{ext}"))
        end
        raw_documents.flatten.sort.map do |f|
          section = File.basename(f)[0..1]

          case File.extname(f)
          when '.md' then
            @settings.merge! file_settings(f)
            render_method = !!@settings['no_section_wrap'] ? :render_markdown : :render_markdown_with_section
            if @documents[section]
              @documents[section] << send(render_method, file_content(f))
            else
              @documents[section] = [ send(render_method, file_content(f)) ]
            end

          when '.slim' then
            if basename_without_index_and_extension(f)[-9..-1] == 'no-source'
              source = ''
            else
              source = render_syntax_highlight(slim file_content(f), layout: false, pretty: true)
            end
            output = slim file_content(f), layout: false, pretty: true
            if @documents[section]
              @documents[section] << [ title_from_filename(f), output, source ]
            else
              @documents[section] = [ [ title_from_filename(f), output, source ] ]
            end

          else
            # Raw HTML
            if basename_without_index_and_extension(f)[-9..-1] == 'no-source'
              source = ''
            else
              source = render_syntax_highlight(file_content(f))
            end
            output = file_content(f)
            if @documents[section]
              @documents[section] << [ title_from_filename(f), output, source ]
            else
              @documents[section] = [ [ title_from_filename(f), output, source ] ]
            end
          end

        end

        slim :component
      end
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

      # ?view=source
      if request['view'].to_s.downcase == 'source'
        @file   = path
        @source = slim layout_view, layout: false, pretty: true
        @source = syntax_highlight(@source)
        return slim :source_view
      end

      # Use custom layout if there is one
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
      unless params[:splat].first[-4,4] == "slim"
        ['slim.md', 'md'].each do |filetype|
          view_name = params[:splat].first
          file  = File.join settings.pages_dir, "#{view_name}.#{filetype}"
          index = File.join settings.pages_dir, "#{view_name}/index.#{filetype}"
          file  = index unless File.exist?(file)

          if File.exist?(file)
            # Default title from dirname, can be overriden in frontmatter of first .md
            @settings['title'] = File.basename(view_name).capitalize
            @settings.merge! file_settings(file)

            case filetype
            when 'md' then
              @content = render_markdown render_markdown file_content(file)
              return slim :page
            when 'slim.md' then
              @content = slim file_content(file), layout: false
              return slim :page_slim
            end
          end
        end
      end

      return_page_not_found
    end

    private

    def doc_hidden(file)
      return false unless File.file?(file)
      settings = file_settings(file)
      settings['hidden'] || false
    end

    def doc_title(file)
      return '¡missing page!' unless File.file?(file)
      settings = file_settings(file)
      settings['title'] ? settings['title'] : 'Untitled'
    end

    def doc_href(file)
      file = file.gsub(/(index)?\.md|\.slim/, '')
      file[settings.pages_dir.length, file.length]
    end

    def dir_to_menu(dir)
      pages = []

      Dir.entries(dir).each do |entry|
        next if entry =~ /^(\.|index|icons|developers)/
        path     = File.join(dir, entry)
        children = []

        if File.directory?(path)
          children = dir_to_menu(path)
          path     = File.join(path, 'index.md')
        end

        pages << {
          title:    doc_title(path),
          href:     doc_href(path),
          hidden:   doc_hidden(path),
          children: children
        }
      end

      pages
    end

    def build_navigation
      @navigation = dir_to_menu(settings.pages_dir)
      @navigation << { title: 'Page Templates', href: '/layouts', children: [] }
      @navigation << { title: 'Component reference', href: '/components', children: [] }
    end

    def basename_without_index_and_extension(f)
      # Name format 00-section-title.filetype
      File.basename(f, File.extname(f))[3..-1]
    end

    def title_from_filename(f)
      # Delete no-source for section title display
      title = basename_without_index_and_extension(f)
      title = title[0..-11] if title[-9..-1] == 'no-source'
      title = title[3..-1] if title[0..2] =~ /\d\d\-/
      "<h2 id=\"#{title}\">#{title.gsub('-', ' ').capitalize}</h2>"
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

    def render_syntax_highlight(block)
      '
    <section class="code">
      <ul class="accordion">
        <li>
          <span class="accordion__title">Sample Markup</span>
          <div class="accordion__hidden">
' + syntax_highlight(block) + '
          </div>
        </li>
      </ul>
    </section>
'
    end

    def syntax_highlight(html = '', lexer = 'html')
      html = yield if block_given?
      Pygments.highlight(html, lexer: lexer)
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
      slim "example_layouts/404".to_sym
    end

  end
end
