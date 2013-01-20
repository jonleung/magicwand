var log_count = 0

var log = function(msg) {
  $("#values").prepend("<p>"+log_count + ": " + msg+"<p><br>")
  log_count++
}

var clear_log = function() {
  $("#values").html("")
}