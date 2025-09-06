/*
  question model: 
    - content 
    - options: string[] 
    - answer: string, 
    - chap_id: string, 
    - imageUrl: string
    - reason: string
*/
import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    chap_id: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    reason: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Question = mongoose.model('questions', QuestionSchema);

export default Question