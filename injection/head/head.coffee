# HTML5Shiv detection code
try
  a = document.createElement('a')
  a.innerHTML = '<xyz></xyz>'
  supportsUnknownElements = a.childNodes.length == 1 || (->
    (document.createElement)('a')
    frag = document.createDocumentFragment()
    return (typeof frag.cloneNode == 'undefined' || typeof frag.createDocumentFragment == 'undefined' || typeof frag.createElement == 'undefined')
  )()
catch e
  supportsUnknownElements = true

unless supportsUnknownElements
  script = document.createElement("script")
  script.type = "text/javascript"
  script.src = "//html5shiv.googlecode.com/svn/trunk/html5.js"
  document.getElementsByTagName('head')[0].appendChild(script)
