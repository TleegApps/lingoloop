import { Router } from 'express';

// Subrouters (to be implemented)
import authRouter from './auth.router';
import dailyRouter from './daily.router';
import deckRouter from './deck.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/daily', dailyRouter);
router.use('/decks', deckRouter);

export default router;
