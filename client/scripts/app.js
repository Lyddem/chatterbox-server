
var app = {

  server: 'http://127.0.0.1:3000/classes/messages',

  renderMessage: function (message) { //OBJECT { username: test, text: test}

    $('#chats').append('<div>' + message.username + ': ' + message.text + '</div>');
  },

  renderMessages: function(data) {
    var results = data.results;
    for (var i = 0; i < results.length; i++) {
      app.renderMessage(results[i]);
    }
  },

  send: function (messageObj) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(messageObj),
      success: function() {
        console.log('chatterbox: Message sent');
        app.fetch();
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });

  },

  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      // data: { order: '-createdAt'},
      success: function (data) {
        console.log('get data', data);
        app.renderMessages(data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },

  clearMessages: function () {
    $('#chats').empty();
  },

  renderRoom: function (room) {
    $('#roomSelect').append('<option>' + room + '</option>');
  },

  handleUsernameClick: function (e) {

    var name = e.target.innerText.split(':')[0];

    console.log('app name', window.names);

    // for (var i = 0; i < window.names.length; i++) {
    //    if (window.names.indexOf(name) === -1) {
    $('.username').append('<li>' + name + '</li>');
    //   }
    // }
  },

  handleSubmit: function () {
    var message = {};

    encodeURI(message.username = window.location.search.slice(10, window.location.search.length)),
    encodeURI(message.text = $('#message').val()),
    encodeURI(message.roomname = $('#roomSelect').val());

    app.send(message);
    $('#message').val('');

    app.renderMessage(message);
  },

  init: function () {
    $('.submit').on('click', function() {
      app.handleSubmit();
    });

    $('#chats').click(function(e) {
      app.handleUsernameClick(e);
    });

    app.fetch();

  }
};

$(document).ready(app.init);


