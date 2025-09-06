import Question from '../models/QuestionModel.js';

const createQuestion = async (req, res) => {
    try {
        const newQuestion = await Question.create(req.body);
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json(updatedQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion };
