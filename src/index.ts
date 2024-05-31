import express from 'express';
import config from './config/index';
import connectDB from './db/conn';

async function main() {
    try {
        await connectDB();

        const app = express();

        app.listen(config.PORT, () => {
            console.log(`Server is running on http://localhost:${config.PORT}`);
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

main();