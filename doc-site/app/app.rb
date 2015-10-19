# encoding: utf-8

EXPORT = (ENV['VERSION'])

require_relative 'helpers'
require_relative 'section_filter'

module DocSite
  class App < Sinatra::Base
    ### Register addons

    register Sinatra::Partial
    register Sinatra::Export

    ### Configure default paths

    set :root,           File.expand_path(File.join(File.dirname(__FILE__), '..'))
    set :views,          File.join(root, 'views')
    set :public_dir,     File.join(root, 'public')
    set :version,        'v3.3.1'

    set :public_folder,  File.join(root, '..', 'build', ENV['VERSION']) if EXPORT

    ### Partials

    set :partial_template_engine, :slim

    ### Web template paths

    set :project_root,   File.expand_path(File.join(root, '..'))
    set :web_templates,  File.join(project_root, 'assets/targets')
    set :injection,      File.join(web_templates, 'injection')
    set :components_dir, File.join(web_templates, 'components')
    set :layouts_dir,    File.join(root, 'views', 'example_layouts')
    set :articles_dir,   File.join(root, 'pages')
    set :temp_dir,       File.join(root, 'tmp')

    set :components,     Dir.entries(components_dir).select { |f| f =~ /^[^\.|\_]*[^\.]$/ }
    set :layouts,        Dir.glob(File.join(layouts_dir, '*.slim')).map { |f| File.basename(f, '.slim') }.reject { |f| f =~ /_layout$/ }
    set :articles,       Dir.glob(File.join(articles_dir, '*.md')).map { |f| File.basename(File.basename(f, '.md'), '.slim') }

    # override sprockets defaults to coexist with webpack
    set :sprockets,      Sprockets::Environment.new(root)

    configure do
      Sprockets::Helpers.configure do |config|
        config.environment = sprockets
        config.default_path_options[:javascript_path] = {
          dir: 'assets',
          ext: 'js'
        }
        config.default_path_options[:stylesheet_path] = {
          dir: 'assets',
          ext: 'css'
        }
      end
    end

    ## Helpers

    helpers Helpers
    helpers Sprockets::Helpers

    before do
      build_navigation

      @settings = {
        'no_section_wrap' => false,
        :current_url      => request.path_info
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

    settings.components.each do |path|
      get "/components/#{path}" do
        # Default title from dirname, override in frontmatter of first .md
        @settings['title'] = File.basename(path).capitalize

        @component = path

        # Determine next and previous links from dir array
        allcomps = settings.components.sort
        curr = allcomps.index(@component) || 0
        @next = curr == allcomps.length - 1 ? allcomps[0] : allcomps[curr + 1]
        @prev = curr == 0 ? allcomps[allcomps.length - 1] : allcomps[curr - 1]

        @documents = {}
        raw_documents = []
        %w(md html slim).each do |ext|
          parent = File.join(settings.components_dir, path, "*.#{ext}")
          raw_documents << Dir.glob(parent)
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
              @documents[section] = [send(render_method, file_content(f))]
            end

          when '.slim' then
            if basename_without_index_and_extension(f)[-9..-1] == 'no-source'
              source = ''
            else
              source = render_syntax_highlight(slim file_content(f), layout: false, pretty: true)
            end
            output = slim file_content(f), layout: false, pretty: true
            if @documents[section]
              @documents[section] << [title_from_filename(f), output, source]
            else
              @documents[section] = [[title_from_filename(f), output, source]]
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
              @documents[section] << [title_from_filename(f), output, source]
            else
              @documents[section] = [[title_from_filename(f), output, source]]
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

    settings.layouts.each do |path|
      get "/layouts/#{path}" do
        layout_view = "example_layouts/#{path}".to_sym
        @layout = true

        # Use custom layout if there is one
        if File.exist? File.join(settings.layouts_dir, path + '_layout.slim')
          slim layout_view, layout: "example_layouts/#{path}_layout".to_sym
        else
          slim layout_view
        end
      end

      get "/layouts/#{path}/source" do
        layout_view = "example_layouts/#{path}".to_sym
        @layout = true

        @file   = path
        @source = slim layout_view, layout: false, pretty: true
        @source = syntax_highlight(@source)
        slim :source_view
      end
    end

    ### Documentation pages
    # get '/articles' do
    #   @pages = []
    #   settings.articles.each do |p|
    #     file = File.join(settings.articles_dir, "#{p}.slim.md")
    #     if File.exist?(file)
    #       props = file_settings(file)
    #     else
    #       file = File.join(settings.articles_dir, "#{p}.md")
    #       props = file_settings(file)
    #     end
    #     @pages << { url: p, props: props }
    #   end
    #   return slim(:articles)
    # end

    settings.articles.each do |path|
      get "/#{path}" do

        # Fancy pants slim
        file = File.join(settings.articles_dir, "#{path}.slim.md")
        if File.exist?(file)
          @content = slim(file_content(file), layout: false)
          return slim(:page_slim)

        else
          # Straight up markdown
          file = File.join(settings.articles_dir, "#{path}.md")
          if File.exist?(file)
            @settings['title'] = path.capitalize
            @settings.merge!(file_settings(file))
            @content = render_markdown(render_markdown(file_content(file)))
            return slim(:page)
          end
        end
      end
    end

    ### Assets

    unless EXPORT
      get '/assets/*' do |path|
        env_sprockets = request.env.dup
        env_sprockets['PATH_INFO'] = path
        settings.sprockets.call env_sprockets
      end

      get '/components/' do
        @components = settings.components
        slim :components_index
      end

      get '/layouts/' do
        @layouts = settings.layouts
        slim :layouts_index
      end

      # 404 for prod
      get '/components/*' do
        return_page_not_found
      end

      get '/layouts/*' do
        return_page_not_found
      end

      get '/*' do
        return_page_not_found
      end
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
      file[settings.articles_dir.length, file.length]
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
      @navigation = dir_to_menu(settings.articles_dir)
      @navigation << {
        title: 'Page Templates', href: '/layouts', children: []
      }
      @navigation << {
        title: 'Component reference', href: '/components', children: []
      }
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
    <section class="code"><ul class="accordion">
      <li>
        <span class="accordion__title">Sample Markup</span>
        <div class="accordion__hidden">
' + syntax_highlight(block) + '
        </div>
      </li>
    </ul></section>
'
    end

    def syntax_highlight(html = '', lexer = 'html')
      html = yield if block_given?
      Pygments.highlight(html, lexer: lexer)
    end

    def front_matter(file)
      @front_matters ||= {}
      unless @front_matters.key? file
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
      slim 'example_layouts/404'.to_sym
    end
  end
end
