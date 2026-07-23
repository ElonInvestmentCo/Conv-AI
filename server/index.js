import express from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json({ limit: '10mb' }));

// Allow Vite proxy to reach the server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const PORT = 3001;

const keys = {
  openai: process.env.OPENAI_API_KEY,
  hf:     process.env.HF_TOKEN,
  fish:   process.env.FISH_AUDIO_API_KEY,
};

console.log('\nAPI key status:');
console.log('  OPENAI_API_KEY    :', keys.openai ? '✓ set' : '✗ MISSING');
console.log('  HF_TOKEN          :', keys.hf     ? '✓ set' : '✗ MISSING');
console.log('  FISH_AUDIO_API_KEY:', keys.fish   ? '✓ set' : '✗ MISSING');
console.log('');

const openai = keys.openai ? new OpenAI({ apiKey: keys.openai }) : null;

// ── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ openai: !!keys.openai, hf: !!keys.hf, fish: !!keys.fish });
});

// ── Chat (OpenAI GPT-4o, streaming SSE) ─────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  if (!openai) {
    return res.status(503).json({ error: 'OPENAI_API_KEY is not configured on the server.' });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('OpenAI error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    }
  }
});

// ── Image generation (Hugging Face FLUX.1-schnell) ───────────────────────────
app.post('/api/images/generate', async (req, res) => {
  if (!keys.hf) {
    return res.status(503).json({ error: 'HF_TOKEN is not configured on the server.' });
  }

  const { prompt } = req.body;
  if (!prompt?.trim()) {
    return res.status(400).json({ error: 'prompt is required.' });
  }

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${keys.hf}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('HF error:', response.status, text);
      return res.status(response.status).json({
        error: `Hugging Face API error (${response.status}): ${text.slice(0, 200)}`,
      });
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const base64  = buffer.toString('base64');
    const mime    = response.headers.get('content-type') || 'image/jpeg';
    res.json({ image: `data:${mime};base64,${base64}`, prompt });
  } catch (err) {
    console.error('HF fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Text-to-Speech (Fish Audio) ──────────────────────────────────────────────
app.post('/api/tts', async (req, res) => {
  if (!keys.fish) {
    return res.status(503).json({ error: 'FISH_AUDIO_API_KEY is not configured on the server.' });
  }

  const { text, format = 'mp3', speed = 1 } = req.body;
  if (!text?.trim()) {
    return res.status(400).json({ error: 'text is required.' });
  }

  const fmt = format.toLowerCase();

  try {
    const response = await fetch('https://api.fish.audio/v1/tts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${keys.fish}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        format: fmt,
        mp3_bitrate: 128,
        latency: 'normal',
        normalize: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Fish Audio error:', response.status, errText);
      return res.status(response.status).json({
        error: `Fish Audio API error (${response.status}): ${errText.slice(0, 200)}`,
      });
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const base64  = buffer.toString('base64');
    const mime    = fmt === 'mp3' ? 'audio/mpeg' : `audio/${fmt}`;
    res.json({ audio: `data:${mime};base64,${base64}`, duration: null });
  } catch (err) {
    console.error('Fish Audio fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Conversation title generation ────────────────────────────────────────────
app.post('/api/title', async (req, res) => {
  if (!openai) {
    return res.status(503).json({ error: 'OPENAI_API_KEY is not configured on the server.' });
  }

  const { message } = req.body;
  if (!message?.trim()) {
    return res.status(400).json({ error: 'message is required.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Generate a short 2–5 word conversation title that captures the core topic of the user message. ' +
            'Reply with ONLY the title — no quotes, no punctuation, no explanation. ' +
            'Capitalise the first word only. ' +
            'Examples: "Help me build a fintech dashboard" → "Fintech dashboard build". ' +
            '"Write a Python web scraper" → "Python web scraper".',
        },
        { role: 'user', content: message.slice(0, 400) },
      ],
      max_tokens: 20,
      temperature: 0.3,
    });
    const title = completion.choices[0]?.message?.content?.trim() ?? '';
    res.json({ title });
  } catch (err) {
    console.error('Title gen error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server → http://0.0.0.0:${PORT}`);
});
