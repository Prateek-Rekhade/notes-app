const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const Note = mongoose.model('Note', { text: String });

app.get('/api/notes', async (req, res) => res.json(await Note.find()));

app.post('/api/notes', async (req, res) =>
  res.json(await Note.create({ text: req.body.text })));

app.delete('/api/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

app.listen(5000, () => console.log('API running on port 5000'));