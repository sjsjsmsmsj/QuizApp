import { Router } from "express";
import questionController from '../controllers/QuestionController.js';
import { verifyAccessToken } from "../middlewares/authorization.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyTeacher } from "../middlewares/verifyTeacher.js";

const router = Router();

router.get('/:id', questionController.getQuestionById);
router.get('/', questionController.getAllQuestions);

router.use(verifyAccessToken)
router.use(verifyTeacher)

router.post('/', questionController.createQuestion);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

export default router;