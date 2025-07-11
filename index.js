const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

app.post('/', async (req, res) => {
  const mensaje = req.body.message;
  if (!mensaje) return res.status(400).json({ error: 'Falta el campo "message"' });

  // Respuesta simulada para testeo
  res.json({ response: "✅ Conexión exitosa. El HUD está hablando con el servidor." });
});

app.listen(port, () => {
  console.log(`🚀 SL-AI de prueba activo en Render (puerto ${port})`);
});
