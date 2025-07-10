const express = require('express');
const app = express();
app.use(express.json());

app.post('/sl-message', (req, res) => {
  const { message, avatar } = req.body;
  const reply = `Hola ${avatar}, recibí tu mensaje: "${message}"`;
  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
