import { Router } from 'express';
import { getSupabase } from '../lib/supabase';

const router = Router();

/**
 * @route   GET /api/daily
 * @desc    Returns the daily loop content (flashcards, quiz, speech)
 * @access  Public (for now — will be secured in production)
 */
router.get('/', async (_, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Simulated daily content generation
    const dailyContent = {
      date: today,
      flashcards: [
        { front: 'Hello', back: 'Hola' },
        { front: 'Thank you', back: 'Gracias' },
        { front: 'Goodbye', back: 'Adiós' },
      ],
      quiz: [
        {
          question: 'What is "Hello" in Spanish?',
          options: ['Bonjour', 'Hola', 'Ciao', 'Hallo'],
          answer: 'Hola',
        },
        {
          question: 'What is "Thank you" in Spanish?',
          options: ['Danke', 'Merci', 'Gracias', 'Grazie'],
          answer: 'Gracias',
        },
      ],
      speech: {
        prompt: 'Say: "I would like a coffee, please."',
        target: 'Quisiera un café, por favor.',
      },
    };

    return res.status(200).json(dailyContent);
  } catch (err) {
    console.error('Daily loop error:', err);
    return res.status(500).json({ error: 'Failed to generate daily content' });
  }
});

export default router;
