import express, { json } from 'express';
import { createServer } from 'http';
import socketIo from 'socket.io';
require('dotenv').config();
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler.js';
import apiLimiter from './middleware/rateLimit.js';
import songRoutes from './routes/songRoutes.js';
import userRoutes from './routes/userRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
require('newrelic');


const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(json());
app.use('/api/', apiLimiter);

const apiLimiter = require('./middleware/rateLimit.js');
app.use('/api/', apiLimiter);


// Routes
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);

// Error handling middleware
app.use(errorHandler);

// Real-time with Socket.io
const server = createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });

    // Define additional WebSocket events and handlers here
});

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});

export default { app, io };
