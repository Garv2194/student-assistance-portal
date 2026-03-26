// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Setup Knex to connect to the database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './digital_assistant.db',
  },
  useNullAsDefault: true,
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- API Endpoints ---
app.post('/api/feedback', async (req, res) => {
  try {
    const { subject, comments } = req.body;

    // Basic validation
    if (!subject || !comments) {
      return res.status(400).json({ error: 'Subject and comments are required.' });
    }

    const [newFeedback] = await knex('feedback').insert({ subject, comments }).returning('*');
    res.status(201).json(newFeedback);
  } catch (err) {
    console.error('Error submitting feedback:', err);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

app.listen(PORT, () => {
  // ...
});
// Test endpoint
app.get('/api/greeting', (req, res) => {
  res.json({ message: 'Hello from the backend! 👋' });
});

// GET all e-books
app.get('/api/ebooks', async (req, res) => {
  try {
    const { semester } = req.query; // Get semester from URL (e.g., /api/ebooks?semester=3)

    let query = knex('ebooks');

    if (semester) {
      query = query.where('semester', semester);
    }

    const ebooks = await query.select('*');
    res.json(ebooks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch e-books' });
  }
});

// GET a single e-book by its ID
app.get('/api/ebooks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ebook = await knex('ebooks').where({ id }).first(); // .first() gets the single object
    if (ebook) {
      res.json(ebook);
    } else {
      res.status(404).json({ error: 'E-book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch e-book' });
  }
});

// FOR REGISTRATION
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, event_name } = req.body;

    if (!name || !email || !event_name) {
      return res.status(400).json({ error: 'Name, email, and event name are required.' });
    }

    const [newRegistration] = await knex('registrations').insert({ name, email, event_name }).returning('*');
    res.status(201).json(newRegistration);
  } catch (err) {
    console.error('Error handling registration:', err);
    res.status(500).json({ error: 'Failed to register for event' });
  }
});

// FOR ACADEMIC NOTICES
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await knex('academic_notices')
                            .select('*')
                            .orderBy('date', 'desc'); // Order by date, newest first                       
    res.json(notices);
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({ error: 'Failed to fetch academic notices' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});