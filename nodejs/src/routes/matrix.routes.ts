import { Router } from 'express';
import { matrixMultiply } from '../controllers/matrix.controller';
const router = Router();

router.get('/', matrixMultiply);

export default router;