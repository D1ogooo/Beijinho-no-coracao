const sqliteConnection = require("../sqlite/index");

class UsersController {
  async create(req, res) {
    const { name, email } = req.body;

    try {
      const database = await sqliteConnection();
      for (let i = 0; i < 10000; i++) {
        const uniqueName = `${name}_${i}`;
        const uniqueEmail = `${i}_${email}`;

        await database.run("INSERT INTO users (name, email) VALUES (?, ?)", [uniqueName, uniqueEmail]);
      }

      return res.status(201).json({ "message": "10.000 usuários criados com sucesso" });
    } catch (error) {
      console.error('Erro ao criar usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async show(req, res) {
    try {
      const database = await sqliteConnection();
      const users = await database.all(`SELECT * FROM users`);
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

module.exports = UsersController;