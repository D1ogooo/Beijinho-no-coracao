const sqliteConnection = require("../sqlite/index");

class usersController {
  async create(req, res) {
   const { name, email } = req.body;

   try {
    const database = await sqliteConnection()
    const checkUserExists = await database.get(`SELECT * FROM users WHERE email = ?`, [email]);

    if (checkUserExists) {
     console.error('Este email já está em uso.');
     return res.status(404).json("Este email já está em uso.")
    }

    await database.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    return res.status(201).json({ "Usuario criado": "sucess" });
   } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
   }
  }

  async show(req, res) {
    const database = await sqliteConnection()
    try {
     const users = await database.all(`SELECT * FROM users`) 
     res.status(200).json(users)
    } catch (error) {
     res.status(404).json(error)
    }
  }
}

module.exports = usersController;