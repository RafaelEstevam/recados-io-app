import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import { HubspotSchedules } from './schedule/sendToHubspot.schedule';

import { routes } from './routes';

const app = express();

app.use(cors({
    origin: "*"
}))

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

mongoose.connect(process.env.MONGO_DB_URL || '').then((response) => {
    console.log('Mongo connected');
    // HubspotSchedules();
}).catch((e) => {
    console.log(e);
});

app.listen(process.env.PORT || 8888, () => {
    console.log("Server is open.");
});

