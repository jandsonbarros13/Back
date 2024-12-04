const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
    const { username, password, userType } = req.body;
    console.log('Dados recebidos:', req.body); // Log para verificar os dados recebidos

    try {
        const newUser = new User({ username, password, userType });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error); // Log do erro
        res.status(400).json({ error: 'Erro ao registrar usuário: ' + error.message });
    }
});

// Rota para fazer login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ error: 'Senha incorreta' });

        res.status(200).json({ message: 'Login bem-sucedido!', userType: user.userType });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login: ' + error.message });
    }
});

// Rota para obter todos os usuários
router.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await User.find(); // Busca todos os usuários no banco de dados
      console.log('Lista de usuários:', usuarios); // Adiciona o console.log aqui
      res.json(usuarios); // Envia a lista de usuários como resposta
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  });
  

// Rota para atualizar um usuário
router.put('/usuarios/:id', async (req, res) => {
    const { username, password, userType } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        user.username = username;
        user.userType = userType;
        if (password) user.password = password;

        await user.save();
        res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar usuário: ' + error.message });
    }
});

// Rota para excluir um usuário
router.delete('/usuarios/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Usuário excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir usuário: ' + error.message });
    }
});

module.exports = router;