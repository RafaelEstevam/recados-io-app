import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { routes } from './routes';

const app = express();

app.use(cors({
    origin: "*"
}))

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(routes);

mongoose.connect('mongodb+srv://rafaelestevamdesign:mrGUY8aV2XKQRo1c@recadosio-messages.8mxbdkg.mongodb.net/?retryWrites=true&w=majority&appName=RecadosIO-messages').then((response) => {
    console.log('Mongo connected');
}).catch((e) => {
    console.log(e);
});

app.listen(8888, () => {
    console.log("Server is open.");
});

