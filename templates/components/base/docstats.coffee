# if document.getElementById('s_commits')

#   if (window.XMLHttpRequest)
#     xhr = new XMLHttpRequest()
#   else if (window.ActiveXObject)
#     # try
#     #   xhr = new ActiveXObject("Msxml2.XMLHTTP")
#     # catch: (e) ->
#     #   try
#     #     xhr = new ActiveXObject("Microsoft.XMLHTTP")
#     #   catch: (e) ->

#     xhr = new ActiveXObject("Microsoft.XMLHTTP")

#   xhr.open('get', 'http://rocky-shelf-9360.herokuapp.com')
#   xhr.onload = ->
#     stats = JSON.parse(xhr.responseText)
#     commits_el = document.getElementById('s_commits')
#     commits_el.innerHTML = stats.commits
#     contribs_el = document.getElementById('s_contributors')
#     contribs_el.innerHTML = stats.contributors

#   xhr.send()
