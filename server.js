// добавляем фреймворк express
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  // добавление корс заголовка 
  cors:{
    origin: '*',
  }
});

app.use(express.json());

const rooms= new Map();
// {
//     'rooms': [],
//     'messages': ['hello']
// }

// действие по запросу гет юзерс
app.get('/rooms', function(req, res) {
    rooms.set();
    res.json(rooms);
});

io.on('connection', (socket) => {
    console.log("user connected", socket.id);


})

// прописываем порт для работы сервера
server.listen(9999, (err) => {
    if (err) {
      throw Error(err);
    }
    console.log('Server is running!');
  });