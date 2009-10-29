MurmurView = function(murmur) {	   
  return {
    render: function() {
      var arrow = $('<span class="arrow-to-right"><span></span></span>')
      var author = $('<span class="author"></span>').text(murmur.author().name)
      var content = $('<div class="content"></div>').html(MurmurRenderPipes.render(murmur.content()))
      var created_at = $('<span class="created-at"></span>').text(murmur.created_at())
      var body = $('<div class="body"></div>').append(arrow).append(created_at).append(author).append(content)
      var icon = $('<div class="icon-border-outer"><div class="icon-border-inner"><img class="icon" src="' + murmur.author().icon_path + '"></div></img>')
      return $('<div id="murmur_' + murmur.id + '" class="murmur"></div>').append(icon).append(body)
    }
  }
}