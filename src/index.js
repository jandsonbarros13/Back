const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Configurações do MongoDB - substitua pelos seus dados
const MONGODB_URI = 'mongodb+srv://Pedro:Inter1909@usuarios.nvl0v.mongodb.net/meu-banco?retryWrites=true&w=majority';

// Importando rotas
const authRoutes = require('./routes/auth');
const bobinaRoutes = require('./routes/bobina');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB Atlas
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado ao MongoDB Atlas');
})
.catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Rota para "Olá Mundo"
app.get('/', (req, res) => {
    res.send('<h1>Olá Mundo</h1>');
});

// Rota para verificar o status do servidor
app.get('/api/auth/status', (req, res) => {
    res.status(200).send('Servidor está ativo');
});

// Usar rotas de autenticação
app.use('/api/auth', authRoutes);

// Usar rotas de bobinas
app.use('/api/bobinas', bobinaRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});