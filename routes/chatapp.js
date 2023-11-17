import { Server } from 'socket.io';

const chatappCode = (server)=>{
  
    const io = new Server(server, {
        cors: {
            origin: true,
        },
    });
    
    const chatapp =  io.of("/chatapp");
    
    chatapp.use((socket,next)=>{
       if(socket.handshake.auth.token==="hehe"){
        socket.status="connected";
        next();
       }else{
        socket.status="invalid";
        next(new Error ("Unauthorized User"));
       }
    });
    
    
    chatapp.on('connection',socket=>{
        console.log("id:"+socket.id); // Logging the socket ID for every new connection is established.
        // Listening for the 'send-Message' event 
        socket.on("send-Message",(message,room)=>{
            console.log(`Received room id :`+room); // Logging the room ID.
            console.log("message is : "+message); // Logging the message.
    

            if(room===''){
                socket.broadcast.emit("recive-message",message); // Braadcasting 
            }else{
                socket.to(room).emit("recive-message",message); // Sending the message to the specified room.
            }
        });
        socket.on("join-room", (room, callback) => {
            socket.join(room);
            if (callback && typeof callback === 'function' && room!=="") {
                callback(`Joined : ${room}`);
            } else {
                console.log("Callback not provided or not a function.");
            }
        });
    });  

// handling requests for game
    const gameRoom =  io.of("/tictactoe");

    gameRoom.on('connection', (socket) => {
        console.log(socket.id +" Connected");
        
        socket.on("joinGameWithId", (room, name) => {
            var roomSize = gameRoom.adapter.rooms.get(room);
            var userCount = roomSize ? roomSize.size : 0;
            console.log('Number of clients', userCount);
            if(userCount<2){
                socket.join(room);
                console.log(name+" Joined the room "+room +"with id: "+socket.id);
                socket.emit("joinGameValidation","OK");
                gameRoom.in(room).emit("playerNames", name);
            }else{
                console.log("Room Full, Not Allowed");
                socket.emit("joinGameValidation","Full");
            }

        });
        
        socket.on('box1',(room,message)=>{
            console.log(room+" "+message);
            // gameRoom.in(room).emit('box1',message);
            socket.broadcast.to(room).emit('box1', message);
        });
        socket.on('box2',(room,message)=>{
            console.log(room+" "+message);
            // gameRoom.in(room).emit('box2',message);
            socket.broadcast.to(room).emit('box2', message);
        });
        socket.on('box3',(room,message)=>{
            console.log(room+" "+message);
            // gameRoom.in(room).emit('box3',message);
            socket.broadcast.to(room).emit('box3', message);
        });
        socket.on('box4',(room,message)=>{
            console.log(room+" "+message);
            // gameRoom.in(room).emit('box4',message);
            socket.broadcast.to(room).emit('box4', message);
        });
        socket.on('box5',(room,message)=>{
            console.log(room+" "+message);
            // gameRoom.in(room).emit('box5',message);
            socket.broadcast.to(room).emit('box5', message);
        });
        socket.on('box6',(room,message)=>{
            console.log(room+" "+message);
            // gameRoom.in(room).emit('box6',message);
            socket.broadcast.to(room).emit('box6', message);
        });
        socket.on('box7',(room,message)=>{
            console.log(room+" "+message);
            // gameRoom.in(room).emit('box7',message);
            socket.broadcast.to(room).emit('box7', message);
        });
        socket.on('box8',(room,message)=>{
            console.log(room+" "+message);
            // gameRoom.in(room).emit('box8',message);
            socket.broadcast.to(room).emit('box8', message);
        });
        socket.on('box9',(room,message)=>{
            console.log(room+" "+message);
            // gameRoom.in(room).emit('box9',message);
            socket.broadcast.to(room).emit('box9', message);
        });

        socket.on('leaveRoom', (room, name) => {
            console.log(gameRoom.adapter.rooms.get(room).size);
            console.log(socket.id + " Trying to leave the room");

            // Forcefully remove the socket from the room
            socket.leave(room);
            console.log(`${name} has left the room ${room}`);
            var roomSize = gameRoom.adapter.rooms.get(room);
            var userCount = roomSize ? roomSize.size : 0;
            console.log('Number of clients', userCount);
            socket.emit('leaveRoomValidation', 'left');
        });

    });
      
};

export default chatappCode;