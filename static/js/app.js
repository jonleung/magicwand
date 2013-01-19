var angle, init_angle, sendSection = false;

var global = (function () { return this; }());
(function () {
  "use strict";

  function run() {
    var w = function (id, text) {
          global.document.getElementById(id).innerHTML = String(text);
        };

    function handleFirstDeviceMotion(ev) {
      window.removeEventListener("devicemotion");
      if (null === ev.acceleration) {
        w('bad-news', "null === event.acceleration<br/>Your device does not have (or does not expose) a gyroscope.");
      }
      window.addEventListener("devicemotion", handleDeviceMotion);
    }

    function handleDeviceMotion(ev) {
      w('interval', ev.interval);

      w('x', ev.acceleration.x);
      w('y', ev.acceleration.y);
      w('z', ev.acceleration.z);

      w('r-alpha', ev.rotationRate.alpha);
      w('r-beta', ev.rotationRate.beta);
      w('r-gamma', ev.rotationRate.gamma);
    }

    function normalizeAngle(theta) {
      if (theta > 180) {
        theta = (theta - 360) * -1;
      }
      else {
        theta *= -1;
      }
      return theta;
    }

    function handleDeviceOrientation(ev) {
      var actual = ev.alpha
      w('a', "actual:" + actual);

      angle = normalizeAngle(actual)

      if (typeof init_angle === 'undefined') {
        init_angle = angle;
      }

      if(sendSection) {
      post_section(getSection(angle));
      }

      w('b', "angle:" + angle);

      
      w('beta', ev.beta);
      w('gamma', ev.gamma);
    }

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    if (undefined === window.DeviceMotionEvent) {
      w('bad-news', "undefined === window.DeviceMotionEvent<br/>Your device lacks (or does not expose) an accelerometer (or gyroscope).");
      return;
    }

    w('no', '');
    window.addEventListener("devicemotion", handleFirstDeviceMotion);
  }

  window.addEventListener('load', run);

}());

var start_angle, end_angle;

function getSection(angle) {
  if(angle < 0) { //Section 1/2
    if(angle < start_angle / 2) { //Section 1
      return 1;
    }
    else { //Section 2
      return 2;
    }
  }
  else { //Section 3/4
    if(angle < end_angle / 2) { // Section 3
      return 3;
    }
    else { // Section 4
      return 4;
    }
  }
}

function activate_section() {
  var timeout;
  $("#send-angle").hammer({ hold_timeout: 0 }).bind("hold", function(e){
    $("#values").prepend("<p>" + angle + " = " + getSection(angle));
    sendSection = true;
    return false;
  });
  $("#send-angle").hammer().bind("release", function(e){
    $("#values").prepend("<p>clearing!</p>" + timeout);
    sendSection = false;
    return false;
  });
}

$(document).ready(function() {


  $("#initialize").hammer({
    hold_timeout: 0
  }).bind("hold release", function(e){
    if(e.type == "hold") {
        $("#initialize").css({background: "red"});
        $("#values").prepend("<p>"+angle+"<p>");
        post_degrees(angle);
    }
    if(e.type == "release") {
        $("#initialize").css({background: "green"})
    }

  })

  $("#calibrate").hammer({ hold_timeout: 0 }).bind("hold", function(e){
    start_angle = angle;
  });

  $("#calibrate").hammer().bind("release", function(e){
    end_angle = angle;
    post_calibrate(start_angle, end_angle);
    activate_section();
  });

});
