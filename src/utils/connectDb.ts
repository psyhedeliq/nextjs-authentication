import mongoose from 'mongoose';

if (!process.env.DATABASE_URL) {
    throw new Error(
        'Please define the DATABASE_URL environment variable inside .env file'
    );
}

const DATABASE_URL: string = process.env.DATABASE_URL;

let globalWithMongoose = global as typeof globalThis & {
    mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDb() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        };

        cached.promise = mongoose
            .connect(DATABASE_URL, options)
            .then((mongoose) => {
                console.log('MongoDB connected');
                return mongoose;
            })
            .catch((error) => {
                console.log('MongoDB connection error', error as Error);
            });
    }

    cached.conn = await cached.promise;
    console.log('MongoDB connection cached');
    return cached.conn;
}

export default connectDb;
