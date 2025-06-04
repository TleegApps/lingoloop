import { Router } from 'express';
import { getSupabase } from '../lib/supabase';

const router = Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  try {
    const supabase = getSupabase();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) return res.status(400).json({ error: error.message });

    return res.status(201).json({ user: data.user });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Log in user via Supabase
 * @access  Public
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  try {
    const supabase = getSupabase();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(401).json({ error: error.message });

    return res.status(200).json({ session: data.session, user: data.user });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
