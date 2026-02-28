const express = require("express");
const userRoutes = require("./routes/user.routes");

require("./database/db");

const app = express();
app.use(express.json());

app.use(userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "rota não encontrada" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});