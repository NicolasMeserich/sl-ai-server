const express = require('express');
const axios = require('axios');
const app = express();

const port = 3000;
const HF_TOKEN = process.env.HF_TOKEN;

app.use(express.json());

async function consultarIA(prompt) {
  try {
    const response = await axios.post(
      'https://router.huggingface.co/v1/chat/completions',
      {
        model: 'HuggingFaceH4/zephyr-7b-beta',
        messages: [
          {
            role: 'system',
            content: 'Sos un asistente experto en scripting de Second Life, especializado en HUDs, UUIDs, sincronización musical y sistemas interregionales.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: false
      },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('❌ Error Hugging Face:', error.response?.data || error.message);
    return 'Error al conectar con la IA en la nube';
  }
}

app.post('/', async (req, res) => {
  const mensaje = req.body.message;
  if (!mensaje) return res.status(400).json({ error: 'Falta el campo "message"' });

  try {
    const respuestaIA = await consultarIA(mensaje);
    res.json({ response: respuestaIA });
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con la IA en la nube' });
  }
});

app.listen(port, () => {
  console.log(`🚀 SL-AI activo con modelo Zephyr (puerto ${port})`);
});
