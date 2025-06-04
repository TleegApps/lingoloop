import { Router } from 'express';
import { getSupabase } from '../lib/supabase';

const router = Router();

/**
 * @route   GET /api/decks
 * @desc    Get all decks for a user (simulate for now)
 * @access  Public (to be authenticated later)
 */
router.get('/', async (_, res) => {
  try {
    // Simulated static response for now
    const decks = [
      {
        id: 'deck_001',
        name: 'Spanish Basics',
        cards: [
          { front: 'Yes', back: 'Sí' },
          { front: 'No', back: 'No' },
        ],
      },
      {
        id: 'deck_002',
        name: 'Food & Dining',
        cards: [
          { front: 'Water', back: 'Agua' },
          { front: 'Bread', back: 'Pan' },
        ],
      },
    ];

    return res.status(200).json({ decks });
  } catch (err) {
    console.error('Error fetching decks:', err);
    return res.status(500).json({ error: 'Unable to retrieve decks' });
  }
});

/**
 * @route   POST /api/decks
 * @desc    Create a new deck (simulated — no DB yet)
 * @access  Public (to be restricted later)
 */
router.post('/', async (req, res) => {
  const { name, cards } = req.body;

  if (!name || !cards || !Array.isArray(cards))
    return res.status(400).json({ error: 'Deck name and cards array are required' });

  try {
    const newDeck = {
      id: `deck_${Date.now()}`,
      name,
      cards,
    };

    // In future: persist to Supabase DB
    return res.status(201).json({ deck: newDeck });
  } catch (err) {
    console.error('Error creating deck:', err);
    return res.status(500).json({ error: 'Unable to create deck' });
  }
});

export default router;
