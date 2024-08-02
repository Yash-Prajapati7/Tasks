import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true,
    unique: true
  },
  genre: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
