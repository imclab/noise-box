/*
 * Noise Box
 *
 * App
 */
var _ = require('underscore');

var HostModel = require('./model/host-model');

module.exports = function(app, io) {



  /*
   * Scratch area
   *
   */

  var hosts = [];

  // // create room
  // var Room = function(){
  //     this.clients = []; // socket.io can manage connections...
  //     this.playqueue = [];
  //     this.history = [];
  // };
  // Room.prototype.addTrack = function() {
  //   // add track to play queue
  // };
  // // etc



  // // add a room
  // var room = new Room();
  // rooms['test'] = room;


  /**
   * Socket testing
   */
  io.sockets.on('connection', function (socket) {
    // a new host
    socket.on('host', function (data) {
      console.log('a room was hosted', data.name);

      var host = new HostModel(data.name);
      host.clients.push(host.id);
      host.ownerID = host.id;
      hosts.push(host);
    });

    // a new client
    socket.on('join', function (data) {
      console.log('a room was joined', data.name);
      var host = _.find(hosts, function(host) {
        return host.name = data.name;
      });

      // send a message out
      socket.emit('message', { 
        content: 'you joined the room ' + host.id,
        clients: host.clients
      });

      socket.broadcast.emit('message', { 
        content: host.id + 'joined the room',
        clients: hosts.clients
      });
    });

  });

};