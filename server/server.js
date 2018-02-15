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
        from: 'Admin',
        text:'Welcome to the chat app',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text:'New user joined',
        createdAt: new Date().getTime()
    });
     
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('createMessage',(newMessage) => {
        console.log('createMessage', newMessage);
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
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



