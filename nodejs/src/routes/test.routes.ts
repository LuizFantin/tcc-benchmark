import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  // TODO
  const result : string[] = [];
  res.status(200).json({ users: result });
});

router.post('/', async (req: Request, res: Response) => {
  // TODO
  res.status(201).json({ user: {} });
});
export default router;