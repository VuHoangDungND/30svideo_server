const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const route = require('./routes');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./config/db');

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

route(app);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

///Handle khi có connect từ client tới
io.on('connection', (socket) => {
    console.log('New client connected' + socket.id);

    // Handle khi có sự kiện tên là sendDataClient từ phía client
    socket.on('sendDataClient', (data) => {
        let newData = data;
        // Creating Query
        const create_Comment_Query =
            "INSERT INTO `user_comment_video` (`id_video`, `id_user`, `comment`) VALUES ('" +
            data.id_video +
            "','" +
            data.id_user +
            "','" +
            data.comment +
            " ' )";

        const get_data_Query = "SELECT * FROM users a WHERE a.id_user LIKE'" + data.id_user + "'";

        //response
        db.query(create_Comment_Query, function (err, result) {
            if (err) return res.status(400);
        });

        db.query(get_data_Query, function (err, result) {
            if (err) return res.status(400);
            newData = { ...newData, ...result[0] };
            io.emit('sendDataServer', { newData });
            console.log(newData);
        });

        // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected'); // Khi client disconnect thì log ra terminal.
    });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
