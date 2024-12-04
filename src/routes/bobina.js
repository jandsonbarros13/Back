const express = require('express');
const Bobina = require('../models/Bobina');
const router = express.Router();

// Rota para adicionar uma nova bobina
router.post('/', async (req, res) => {
    const { nome, peso } = req.body;

    try {
        const newBobina = new Bobina({ nome, peso });
        await newBobina.save();
        res.status(201).json({ message: 'Bobina adicionada com sucesso!', bobina: newBobina });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar bobina: ' + error.message });
    }
});

// Rota para obter todas as bobinas
router.get('/', async (req, res) => {
    try {
        const bobinas = await Bobina.find();
        res.status(200).json(bobinas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar bobinas: ' + error.message });
    }
});

// Rota para atualizar uma bobina
router.put('/:id', async (req, res) => {
    const { nome, peso } = req.body;
    try {
        const bobina = await Bobina.findById(req.params.id);
        if (!bobina) return res.status(404).json({ error: 'Bobina não encontrada' });

        bobina.nome = nome || bobina.nome;
        bobina.peso = peso || bobina.peso;

        await bobina.save();
        res.status(200).json({ message: 'Bobina atualizada com sucesso!', bobina });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar bobina: ' + error.message });
    }
});

// Rota para excluir uma bobina
router.delete('/:id', async (req, res) => {
    try {
        await Bobina.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Bobina excluída com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir bobina: ' + error.message });
    }
});

module.exports = router;