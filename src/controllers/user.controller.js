const userService = require("../services/user.service");

async function create(req, res) {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ error: "nome e email são obrigatórios" });
    }

    const user = await userService.createUser(nome, email);
    return res.status(201).json(user);
  } catch (err) {
    if (String(err.message).includes("UNIQUE")) {
      return res.status(400).json({ error: "email já cadastrado" });
    }
    return res.status(500).json({ error: "erro interno" });
  }
}

async function list(req, res) {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: "erro interno" });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ error: "usuário não encontrado" });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "erro interno" });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { nome, status } = req.body;

    if (!nome || !status) {
      return res.status(400).json({ error: "nome e status são obrigatórios" });
    }

    if (status !== "ativo" && status !== "inativo") {
      return res.status(400).json({ error: "status deve ser 'ativo' ou 'inativo'" });
    }

    const changes = await userService.updateUser(id, nome, status);
    if (changes === 0) return res.status(404).json({ error: "usuário não encontrado" });

    const updated = await userService.getUserById(id);
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ error: "erro interno" });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    const changes = await userService.deactivateUser(id);
    if (changes === 0) return res.status(404).json({ error: "usuário não encontrado" });

    return res.status(200).json({ message: "usuário desativado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: "erro interno" });
  }
}

module.exports = {
  create,
  list,
  getById,
  update,
  remove,
};