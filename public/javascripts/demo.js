(function ($) {
  $(document).ready(
    function(){
      var socket = io.connect();

      socket.on('connection', function() {
        console.log("Connected");
      })

      $('#led').on('click', function(event) {
        event.preventDefault();
        console.log("LED toggled");
        socket.emit('led');
      });

      $('#buzzer').on('click', function(event) {
        event.preventDefault();
        console.log("Buzzer toggled");
        socket.emit('buzzer');
      });

      $('#vibrate').on('click', function(event) {
        event.preventDefault();
        console.log("Vibrate toggled");
        socket.emit('vibrate');
      });
    }
  )
})(window.jQuery)