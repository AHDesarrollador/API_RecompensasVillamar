require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 👈 AGREGAR ESTE IMPORT

const authRoutes = require('./routes/auth');
const clientesRoutes = require('./routes/clientes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta de prueba para verificar que funciona
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => {
        console.error('Error conectando MongoDB:', err);
        // No terminar el proceso en Vercel
    });

const PORT = process.env.PORT || 5000;

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

// Necesario para Vercel
module.exports = app;
