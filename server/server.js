const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static(publicPath));
io.on('connection' , (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from:'erezsmtn',
        text:'Hello',
        createdAt: 123123
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('createMessage',(newMessage) => {
        console.log('createMessage', newMessage);
    });
});

  
server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});



