(function ($) {
  $(document).ready(
    function(){
      $('#led').on('click', function(event) {
        event.preventDefault();
        console.log("LED toggled");
      });

      $('#buzzer').on('click', function(event) {
        event.preventDefault();
        console.log("Buzzer toggled");
      });

      $('#vibrate').on('click', function(event) {
        event.preventDefault();
        console.log("Vibrate toggled");
      });

      var socket = io.connect('http://localhost:3000');

      socket.on('connection', function() {
        console.log("Connected");
      })
    }
  )
})(window.jQuery)