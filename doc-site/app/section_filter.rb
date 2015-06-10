module WebTemplates
  class SectionFilter < HTML::Pipeline::Filter
    def call
      "<section>#{doc.to_s}</section>"
    end
  end
end
