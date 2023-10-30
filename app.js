import express from 'express';
import bodyParser from 'body-parser';
import os from 'os';
import { createServer } from 'http';
import chatappCode from './routes/chatapp.js';

const app = express();
const server = createServer(app);
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let localAddress = 'localhost';

const interfaces = os.networkInterfaces();
Object.keys(interfaces).forEach((interfaceName) => {
    interfaces[interfaceName].forEach((iface) => {
        if (iface.family === 'IPv4' && !iface.internal) {
            localAddress = iface.address;
        }
    });
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Server is also accessible at http://${localAddress}:${PORT}`);
});
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

//defining the password checker middleware
const checkPassword = (req, res, next) => {
    const expectedPassword = process.env.apiPassword; // Password for requests
    const providedPassword = req.headers.authorization; // The password is sent in the authorization header
    if (!providedPassword || providedPassword !== expectedPassword) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();   //if  Password is correct, proceed to the next middleware or route
};
//using middlewares
// app.use('/', checkPassword);

app.get("/",(req,res)=>{
   res.render("mainpage.ejs");
});

app.post("/joinRoom",(req,res)=>{
    console.log(req.body);
    res.render("index.ejs",{
        userName:req.body.username,
        chatRoomId :req.body.chatRoomId,
    });
});

chatappCode(server);
