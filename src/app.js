const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./routes');
const router = require('./routes/home');

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

route(app);

app.listen(port, () => console.log(`listening on port ${port}`));
