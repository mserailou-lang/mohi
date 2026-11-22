import express from 'express';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'contact-messages.json');
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

async function readMessages() {
  try {
    const raw = await fs.readFile(STORE_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

app.post('/api/contact', async (request, response) => {
  const body = request.body ?? {};
  const values = {
    name: String(body.name ?? '').trim(),
    email: String(body.email ?? '').trim(),
    subject: String(body.subject ?? '').trim(),
    message: String(body.message ?? '').trim(),
  };

  const errors = {};
  if (values.name.length < 2 || values.name.length > 80) {
    errors.name = 'Please tell me your name.';
  }
  if (!EMAIL_PATTERN.test(values.email) || values.email.length > 120) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.subject.length < 2 || values.subject.length > 120) {
    errors.subject = 'Please add a short subject.';
  }
  if (values.message.length < 10 || values.message.length > 2000) {
    errors.message = 'Please write at least a few words.';
  }

  if (Object.keys(errors).length) {
    response.status(422).json({ ok: false, errors, message: 'Please check the highlighted fields.' });
    return;
  }

  const entry = {
    id: randomUUID(),
    ...values,
    receivedAt: new Date().toISOString(),
  };

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const messages = await readMessages();
    messages.push(entry);
    await fs.writeFile(STORE_FILE, `${JSON.stringify(messages, null, 2)}\n`, 'utf8');
    response.status(201).json({ ok: true, id: entry.id });
  } catch (error) {
    console.error('Could not store contact message', error);
    response
      .status(500)
      .json({ ok: false, message: 'Your message could not be saved. Please try again.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mother & More API listening on http://0.0.0.0:${PORT}`);
});
