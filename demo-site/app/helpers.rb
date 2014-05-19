module Helpers
  def path_to_title(path)
    return nil if path.blank?
    path.gsub(/^todo-/, '').split('-').map(&:capitalize).join(' ')
  end

  def page_title
    return @settings['title'] if @settings && @settings.has_key?('title')
    path_to_title request.path_info.split('/').last
  end

  alias :component_title :path_to_title
  alias :layout_title    :path_to_title

  def component_pending?(name)
    false
  end

  def component_path(component)
    "/components/#{component.downcase}"
  end

  def layout_path(layout, opt=false)
    path = "/layouts/#{layout.downcase}"
    !!opt ? "#{path}?view=" + opt : path
  end
end
