var angle, init_angle, magnitude, sendSection = false, demo;

var global = (function () { return this; }());
(function () {
  "use strict";

  function run() {
    var w = function (id, text) {
          var el = global.document.getElementById(id)
          if (el != null) {
            el.innerHTML = String(text);  
          }
          
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

    function normalizeAngle(theta) { //ADDED
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

      w('b', "angle:" + angle);

      w('beta', ev.beta);

      var beta = ev.beta;
      if (ev.beta < 0) {
        beta = 0;
      }
      else if (ev.beta > 80) {
        beta = 80;
      }
      magnitude = beta/80.0*100;

      w('gamma', ev.gamma);

      if(sendSection) {
        post_section(getSection(angle), magnitude, demo);
      }

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
  $(".activate").hammer({ hold_timeout: 0 }).bind("hold", function(e){
    demo = $(".activate").attr("demo")
    log(angle)
    sendSection = true;
    return false;
  });
  $(".activate").hammer().bind("release", function(e){
    sendSection = false;
    return false;
  });
}

$(document).ready(function() {

  $("#calibrate").hammer({ hold_timeout: 0 }).bind("hold", function(e){
    start_angle = angle;
  });

  $("#calibrate").hammer().bind("release", function(e){ //ADDED
    end_angle = angle;
    post_calibrate(start_angle, end_angle);
    activate_section();
  });

});
