$(document).ready(function() {

  window.scrollTo(0,1)

  $(".switcher").css({bottom: 0})

  var drag_counter = 0
  var cur_screen_id = 1
  var TOTAL_SCREENS = $(".screen").length

  var showScreen = function(cur_screen_id) {
    $(".screen").addClass("none")
    $("#"+cur_screen_id).removeClass("none")
    log("showing screen " + cur_screen_id + " of " + TOTAL_SCREENS)
  }


  $(".switcher").hammer({
    // hold_timeout: 0
  }).bind("doubletap", function(e){
      
    if (e.type == "doubletap") {
      log("doubletap")

      if( $(this).attr('id') == "prev" ) {
        if(cur_screen_id > 1) {
          cur_screen_id--
          $("#next").css({background: "green"})
        }
        if(cur_screen_id == 1) {
          $(this).css({background: "gray"})
        }
        $(position).html(cur_screen_id + " of " + TOTAL_SCREENS)
        showScreen(cur_screen_id)
      }
      else {
        if(cur_screen_id < TOTAL_SCREENS) {
          cur_screen_id++
          $("#prev").css({background: "red"})
        }
        if(cur_screen_id == TOTAL_SCREENS) {
          $(this).css({background: "gray"})
        }
        $(position).html(cur_screen_id + " of " + TOTAL_SCREENS)
        showScreen(cur_screen_id)
        
      }
      
    }
  })



  // $(".switcher").hammer({
  //   // hold_timeout: 0
  // }).bind("doubletap", function(e){
  
  //   // Tap    
  //   if(e.type == "tap") {
  //     log("tap")
  //   }

  //   // Double Tap
  //   else if (e.type == "doubletap") {
  //     log("doubletap")
  //   }

  //   // Hold
  //   else if (e.type == "hold") {
  //     log("hold")
  //   }

  //   // Release
  //   else if (e.type == "release") {
  //     log("release")
  //   }

  //   // Drag
  //   else if (e.type == "dragend") {
  //     log("dragend: " + e.direction)

  //     if (e.direction == "left") {
  //       if(cur_screen_id < TOTAL_SCREENS) {
  //         cur_screen_id++
  //       }
  //       showScreen(cur_screen_id)
  //     }
  //     else {
  //       if(cur_screen_id > 0) {
  //         cur_screen_id--
  //       }
  //       showScreen(cur_screen_id)
  //     }

  //   }


  //   // Swipe
  //   else if (e.type == "transformstart") {
  //     clear_log()
  //     log("transform")
  //   }
  // })



});
 
 /*

  if(e.type == "hold") {
      // log("<p>"+polar+"<p>")
      log("hold")
  }

  if(e.type == "swipe") {
    offset = actual
    log("swipe")
  }
  else if(e.type == "release") {
      $("#initialize").css({background: "green"})
      log("release")
  }

  else if(e.type == "doubletap") {
      $("#initialize").css({background: "black"})
      self.delay
      log("doubletap")
  }

 */