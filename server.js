// добавляем фреймворк express
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { cors: { origin: '*', } });

app.use(express.json());

// var router = express.Router();

// // About page route.
// router.get('/about', function (req, res) {
//   res.send('About this wiki');
// })

// module.exports = router;


const rooms = new Map();

function makeCounter() {
  var currentCount = 1;
  return function () {
    return currentCount++;
  };
}
const counter = makeCounter();


app.get('/rooms/:id', (req, res) => {
  const { id: roomId } = req.params;
  
  console.log(req.params.id)
  
  rooms.has(roomId) ? console.log("room was founded") : console.log("room hasn't any data yet")
  
  const obj = rooms.has(roomId)
    ? {
      users: [...rooms.get(roomId).get('users').values()],
      messages: [...rooms.get(roomId).get('messages').values()],
    }
    : { users: [], messages: [] };

  res.json(obj);
});



app.post('/rooms', (req, res) => {
  const { userName } = req.body;
  const roomId2 = req.body.roomId;
  const roomId = (roomId2 === "") ? counter() : roomId2;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
  }
  console.log("user with name: ", userName, "vhodit v komnaty nomer", roomId);
  res.send([roomId]);
});


io.on('connection', (socket) => {

  socket.on('ROOM:JOIN', ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, userName);
    console.log("smotri",rooms.get(roomId));
    const users = [...rooms.get(roomId).get('users').values()];
    socket.to(roomId).emit('ROOM:SET_USERS', users);
  });

  socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }) => {
    const obj = {
      userName,
      text,
    };
    rooms.get(roomId).get('messages').push(obj);
    socket.broadcast.to(roomId).emit('ROOM:NEW_MESSAGE', obj);
  });

  socket.on('disconnect', () => {
    console.log(socket.id, "disconnected from socket");
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()];
        console.log(users)
        socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users);
      }
    });
  });
  console.log("user connected", socket.id);
})
// прописываем порт для работы сервера
server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Server is running!');
});