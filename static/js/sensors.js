var actual;
var polar;
var offset = 0;


(function () {

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

  function run() {

    function handleFirstDeviceMotion(ev) {
      window.removeEventListener("devicemotion");
      if (null === ev.acceleration) {
        log('bad-news, null === event.acceleration, Your device does not have (or does not expose) a gyroscope.');
      }
      window.addEventListener("devicemotion", handleDeviceMotion);
    }

    function handleDeviceMotion(ev) {
      w('interval', ev.interval);

      // w('x', ev.acceleration.x);
      // w('y', ev.acceleration.y);
      // w('z', ev.acceleration.z);

      // w('r-alpha', ev.rotationRate.alpha);
      // w('r-beta', ev.rotationRate.beta);
      // w('r-gamma', ev.rotationRate.gamma);
    }


    function handleDeviceOrientation(ev) {
      actual = ev.alpha
      w('a', "actual: " + actual)

      polar = toPolarCoordinates(actual)
      // w('b', "polar:" + polar);

      var offseted_actual = actual+offset
      w('b', "offseted_actual: " + offseted_actual);


      // w('beta', ev.beta);
      // w('gamma', ev.gamma);
    }

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    if (undefined === window.DeviceMotionEvent) {
      log('bad-news, undefined === window.DeviceMotionEvent, Your device lacks (or does not expose) an accelerometer (or gyroscope).');
      return;
    }

    window.addEventListener("devicemotion", handleFirstDeviceMotion);
  }

  window.addEventListener('load', run);

}());

