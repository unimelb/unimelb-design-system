if document.getElementById('s_commits')
  xhr = new XMLHttpRequest()
  xhr.open('get', 'http://rocky-shelf-9360.herokuapp.com', true)
  xhr.onload = ->
    stats = JSON.parse(xhr.responseText)
    commits_el = document.getElementById('s_commits')
    commits_el.innerHTML = stats.commits
    contribs_el = document.getElementById('s_contributors')
    contribs_el.innerHTML = stats.contributors

  xhr.send()
