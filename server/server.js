const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static(publicPath));
io.on('connection' , (socket) => {
    console.log('new user connected');

    socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined'));
     
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('createMessage',(newMessage) => {
        console.log('createMessage', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.form,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });
});

  
server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});



