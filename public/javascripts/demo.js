(function ($) {
  $(document).ready(
    function(){

      var socket = io.connect();

      socket.on('connect', function() {
        console.log("Connected");
        socket.emit('check');
      })

      socket.on('components', function(data) {
        data.forEach(function(component) {
          var button = ($('#' + component.name));
          if(component.status) {
            button.removeClass('off');
          } else {
            button.addClass('off');
          }
        })
      })

      socket.on('toggle', function(data) {
        console.log(data);
        var button = ($('#' + data.name));
        var status = data.status;
        if (status) {
          button.removeClass('off');
        } else {
          button.addClass('off');
        }
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