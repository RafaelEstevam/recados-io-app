import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Logs = new Schema({
    body: String,
    headers: String,
    ip: String,
    date: Date,
});

export default mongoose.model('Logs', Logs)