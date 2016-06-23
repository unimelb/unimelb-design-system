# rubocop:disable Style/FileName
module RodaHelpers
  #
  module InstanceMethods
    def path_to_title(path)
      return nil if path.nil? || path == ''
      path.gsub(/^todo-/, '').split('-').map(&:capitalize).join(' ')
    end

    def page_title
      return @settings['title'] if @settings && @settings.key?('title')
      path_to_title request.path_info.split('/').last
    end

    alias component_title path_to_title
    alias layout_title path_to_title

    def component_path(component)
      "/components/#{component.downcase}"
    end

    def blank?
      self !~ /\S/
    end

    # Name format 00-section-title.filetype
    def basename_without_index_and_extension(f)
      File.basename(f, File.extname(f))[3..-1]
    end

    def title_from_filename(f)
      # Delete no-source for section title display
      title = basename_without_index_and_extension(f)
      title = title[0..-11] if title[-9..-1] == 'no-source'
      title = title[3..-1] if title[0..2] =~ /\d\d\-/
      "<h2 id=\"#{title}\">#{title.tr('-', ' ').capitalize}</h2>"
    end
  end
end
