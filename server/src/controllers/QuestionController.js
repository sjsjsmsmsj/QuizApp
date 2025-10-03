import Question from '../models/QuestionModel.js';
import asyncHandler from 'express-async-handler';
import AppError from '../../error.js';

const createQuestion = asyncHandler(async (req, res) => {
    const newQuestion = await Question.create(req.body);
    // HTTP Status 201 for resource creation
    res.status(201).json(newQuestion);
});

const getAllQuestions = asyncHandler(async (req, res) => {
    const questions = await Question.find();
    res.status(200).json(questions);
});

const getQuestionById = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);

    if (!question) {
        // Use throw to stop execution and pass the error to asyncHandler/global error handler
        throw new AppError('Question not found with that ID', 404);
    }

    res.status(200).json(question);
});

const updateQuestion = asyncHandler(async (req, res) => {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true // Good practice to re-run validation on updates
    });

    if (!updatedQuestion) {
        // Use throw to stop execution and pass the error to asyncHandler/global error handler
        throw new AppError('Question not found with that ID', 404);
    }

    res.status(200).json(updatedQuestion);
});

const deleteQuestion = asyncHandler(async (req, res) => {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

    if (!deletedQuestion) {
        // Use throw to stop execution and pass the error to asyncHandler/global error handler
        throw new AppError('Question not found with that ID', 404);
    }

    // HTTP Status 204 for successful deletion with no content
    res.status(204).json(null);
});

export default { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion };