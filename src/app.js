const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const route = require('./routes');
const router = require('./routes/home');

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

route(app);

app.listen(port, () => console.log(`listening on port ${port}`));
