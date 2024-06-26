import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import config from './config/index';
import connectDB from './db/conn';
import initializeSocket from './services/socket';
import path from 'path';
import ApiRoutes from "./routes/index";

async function main() {
    try {
        // ! issue with this line
        await connectDB(); 

        const app = express();
        const server = http.createServer(app);

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors({
            origin: '*',
        }));

        app.use('/api',ApiRoutes);

        const io = new SocketIOServer(server,{
            cors:{
                origin: '*',
                methods: ['GET', 'POST'],
                credentials: true
            }
        });
        initializeSocket(io);   

        server.listen(config.PORT, () => {
            console.log(`Server is running on http://localhost:${config.PORT}`);
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

main();