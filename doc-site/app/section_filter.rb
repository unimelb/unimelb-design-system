require 'html/pipeline/filter'

module DocSite
  class SectionFilter < HTML::Pipeline::Filter
    def call
      "<section>#{doc.to_s}</section>"
    end
  end
end
