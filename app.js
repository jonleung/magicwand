var polar;

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

    function toPolarCoordinates(theta) {
      var t = theta
      if (t > 180) {
        t = (t-360)*-1
      }
      else {
        t *= -1
      }
      return t
    }

    function handleDeviceOrientation(ev) {
      var actual = ev.alpha
      w('a', "actual:" + actual);

      polar = toPolarCoordinates(actual)
      w('b', "polar:" + polar);

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



$(document).ready(function() {


  $("#initialize").hammer({
    hold_timeout: 0
  }).bind("hold release", function(e){
    if(e.type == "hold") {
        $("#initialize").css({background: "red"})
        $("#values").prepend("<p>"+polar+"<p>")
    }
    if(e.type == "release") {
        $("#initialize").css({background: "green"})
    }

  })



});
