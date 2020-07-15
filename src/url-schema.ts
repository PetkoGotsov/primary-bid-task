import {
    Schema
  } from 'mongoose';
  import mongoose from 'mongoose';
  
export const Url = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: false },
    value: String,
    trimmedValue: String,
    date: Date,
  });

const urls = mongoose.model("urls", Url);
export default urls;