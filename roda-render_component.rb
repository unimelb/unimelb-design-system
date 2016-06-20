# rubocop:disable Style/FileName
module RodaRenderComponent
  #
  module InstanceMethods
    def get_component(path, opts = {})
      @documents = {}
      @code_i = 0

      raw_documents = []
      %w(md html slim).each do |ext|
        parent = File.join(opts[:components], path, "*.#{ext}")
        raw_documents << Dir.glob(parent)
      end

      raw_documents.flatten.sort.map { |f| get_section(f, opts) }

      @documents['_append'] = [trigger_source_editable] if @code_i > 0

      @documents
    end

    def get_section(f, opts)
      section = File.basename(f)[0..1]
      @documents[section] = [] unless @documents[section]
      @documents[section] << process_section(f, opts)
    end

    def process_section(f, opts)
      puts opts.include? :code_only
      case File.extname(f)
      when '.md' then
        build_markdown(f) unless opts.include? :code_only
      when '.slim' then
        build_slim(f, opts)
      else
        build_html(f, opts)
      end
    end

    private

    # Render block through tilt template
    def slim(content, scope = self)
      Slim::Template.new(pretty: true) { content }.render(scope)
    end

    # Render block through tilt template
    def markdown(content)
      Tilt::RedcarpetTemplate.new { content }.render
    end

    # Render slim
    def build_slim(f, opts)
      params = ''
      source = basename_without_index_and_extension(f)[-9..-1] == 'no-source' || (opts.include? :code_only) # rubocop:disable Style/LineLength
      if source
        source = nil
      else
        source = render_source_block(slim(file_content(f)))
        params = ' id="r' + @code_i.to_s + '"'
      end

      output = '<div' + params + '>' + slim(file_content(f)) + '</div>'

      [title_from_filename(f), output, source]
    end

    def build_html(f, opts)
      params = ''
      source = basename_without_index_and_extension(f)[-9..-1] == 'no-source' || (opts.include? :code_only) # rubocop:disable Style/LineLength
      if source
        source = nil
      else
        source = render_source_block(file_content(f))
        params = ' id="r' + @code_i.to_s + '"'
      end

      output = '<div' + params + '>' + file_content(f) + '</div>'

      [title_from_filename(f), output, source]
    end

    def build_markdown(f)
      markdown(file_content(f))
    end

    # Predefined block for displaying example source
    def render_source_block(block)
      @code_i += 1
      '
    <section class="code">
      <pre class="html" id="s' + @code_i.to_s + '">
' + convert_tags(block) + '
      </pre>
    </section>
'
    end

    def trigger_source_editable
      # rubocop:disable Style/LineLength
      buf = '
      <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/ace.js" type="text/javascript" charset="utf-8"></script>
'
      @code_i.times do |i|
        l = (1 + i).to_s
        buf += '
      <script>
        var e' + l + ' = ace.edit("s' + l + '");
        e' + l + '.setTheme("ace/theme/github");
        e' + l + '.session.setMode("ace/mode/html");
        e' + l + '.getSession().setTabSize(2);
        e' + l + '.getSession().setUseSoftTabs(true);
        e' + l + '.getSession().on("change", function(e){
          document.getElementById("r' + l + '").innerHTML = e' + l + '.getValue();
          UOMloadComponents();
        });
      </script>
'
      end

      buf
    end

    # Parse front matter and cache
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

    def file_settings_title(file)
      file_settings(file)['title']
    end

    def file_content(file)
      front_matter(file).content
    end

    # Prep tag block for html display
    def convert_tags(block = '')
      block = yield if block_given?
      block.gsub('<', '&lt;').gsub('>', '&gt;')
    end
  end
end
