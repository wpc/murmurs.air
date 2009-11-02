TimelineController = function() {
  var timeline = new Timeline()
  var interval = 30 * 1000
  
  var create_context_menu = function(murmur){
    var menu = new air.NativeMenu()
    
    var copy_item = new air.NativeMenuItem("Copy")
    copy_item.addEventListener(air.Event.SELECT, function(event) { do_copy() })
    menu.addItem(copy_item)
    
    var remurmur_item = new air.NativeMenuItem("Remurmur...")
    remurmur_item.addEventListener(air.Event.SELECT, function() { do_remurmur(murmur) });
    menu.addItem(remurmur_item)
    
    return menu
  }
  
  var do_remurmur = function(murmur) {
    PostController.open({ init_content : murmur.remurmur()} )
  }
  
  var do_copy = function() {
    air.Clipboard.generalClipboard.clear();
    air.Clipboard.generalClipboard.setData(air.ClipboardFormats.TEXT_FORMAT, window.getSelection());
  }
  
  var public = {
    init: function(container) {
      var view = new TimelineView(container)
      
      timeline.onchange(function(event, murmur) {
        view[event](murmur)
      })
      
      $("button.post").click(PostController.open)
      
      $('.murmur').live('contextmenu', function(event){
        var menu = create_context_menu(timeline.find($(this).attr('murmur_id')))
        event.preventDefault()
        menu.display(window.nativeWindow.stage, event.clientX, event.clientY)
      })
      
      view.scroll(function() {
        if(!view.at_bottom() || view.has_spinner()) { return }
        
        view.append_spinner()
        MurmursService.fetch_before(timeline.oldest_id(), function(murmurs) {
          view.remove_spinner()
          timeline.append_all(murmurs)
        })
      })
      
      public.refresh()
      setInterval(public.refresh, interval)
    },

    refresh: function() {
      MurmursService.fetch_since(timeline.latest_id(), timeline.prepend_all)
    }
  }
  
  
  return public
}()
