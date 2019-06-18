require File.join(File.dirname(__FILE__), 'roda-helpers')
Roda.plugin RodaHelpers

require File.join(File.dirname(__FILE__), 'roda-render_component')
Roda.plugin RodaRenderComponent

#
class App < Roda # rubocop:disable Metrics/ClassLength
  use Rack::Session::Cookie, secret: ENV['SECRET']
  opts[:root] = File.join(File.dirname(__FILE__))

  plugin :static, ['/assets', '/builds/' + ENV['HEROKU_SLUG_COMMIT']]
  plugin :render, engine: 'slim'

  opts[:version] = ENV['VERSION']
  # opts[:major_version] = /^v[0-9]+/.match(ENV['VERSION'])[0]
  opts[:cdnurl] = ENV['CDNURL']

  opts[:components_path] = File.join(
    opts[:root], 'assets', 'components'
  )
  opts[:components] = Dir.entries(opts[:components_path])
  opts[:components] = opts[:components].select do |path|
    File.exist?(File.join(opts[:components_path], path, "00-overview.md"))
  end

  opts[:pages_path] = File.join(opts[:root], 'views', 'pages')

  route do |r|
    build_navigation

    r.root do
      # Unset page title
      opts[:pagetitle] = nil
      view('homepage')
    end

    # Component and index
    r.on 'components' do
      r.on 'all' do
        @component = true
        @components = []
        opts[:components].each do |path|
          @components << get_component(path, components: opts[:components_path], code_only: true) # rubocop:disable Metrics/LineLength
        end
        opts[:pagetitle] = 'All Components'
        view('components/all')
      end

      r.on :path do |path|
        if Dir.exist? File.join(opts[:components_path], path)
          @title = File.basename(path).capitalize
          @component = path
          @documents = get_component(path, components: opts[:components_path])
          opts[:pagetitle] = @title
          view('components/show')
        end
      end

      r.is do
        opts[:pagetitle] = 'Components'
        view('components/index')
      end

      r.root do
        opts[:pagetitle] = 'Components'
        view('components/index')
      end
    end

    # Complete layout, with source variant and index
    r.on 'layouts' do
      r.on :path do |path|
        f = File.join(opts[:root], 'views', 'templates', path + '.slim')
        if File.exist? f
          @layout = true

          r.on 'source' do
            @file = path
            @source = convert_tags(slim(file_content(f)))
            opts[:pagetitle] = "Source for #{@file}"
            view('templates/source')
          end

          opts[:pagetitle] = File.basename(path).capitalize
          view('templates/' + path)
        end
      end

      r.is do
        opts[:pagetitle] = 'Layouts'
        view('templates/index')
      end

      r.root do
        opts[:pagetitle] = 'Layouts'
        view('templates/index')
      end
    end

    # Content page
    r.on :path do |path|
      path = path.chop if path[-1] == '/'
      basepath = File.join(opts[:root], 'views', 'pages', path)
      @content = ''
      if File.exist? basepath + '.md'
        @content = file_content(basepath + '.md')
        opts[:pagetitle] = file_settings_title(basepath + '.md')
        @content = markdown(@content)
      elsif File.exist? basepath + '.slim'
        @content = file_content(basepath + '.slim')
        opts[:pagetitle] = file_settings_title(basepath + '.slim')
        @content = slim(@content)
      elsif File.exist? basepath + '.slim.md'
        @content = file_content(basepath + '.slim.md')
        opts[:pagetitle] = file_settings_title(basepath + '.slim.md')
        @content = markdown(slim(@content))
      end
      view('pages/show') unless @content.empty?
    end
  end

  private

  def build_navigation
    opts[:navigation] = []

    build_pages_navigation

    opts[:navigation] << { title: 'Components', href: '/components' }
    opts[:navigation] << { title: 'Layouts', href: '/layouts' }
  end

  def build_pages_navigation
    pages = Dir.entries(opts[:pages_path]).select do |f|
      f =~ /^[^\.|\_|show].*$/
    end
    pages.each { |p| add_page(p) }
  end

  def add_page(p)
    settings = file_settings(File.join(opts[:pages_path], p))
    return if settings['hidden']
    path = '/' + p.gsub('.md', '').gsub('.slim', '')
    opts[:navigation] << { title: settings['title'], href: path }
  end
end
