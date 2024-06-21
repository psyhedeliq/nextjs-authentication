// Next.js API route support: https://nextjs.org/docs/api-routes/introductionimport connectDb from '@/utils/connectDb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import connectDb from '@/utils/connectDb';
import type { NextApiRequest, NextApiResponse } from 'next';

const { ACTIVATION_TOKEN_SECRET } = process.env;
interface UserToken {
    id: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await connectDb();
        const { token } = req.body;
        const userToken = jwt.verify(
            token,
            ACTIVATION_TOKEN_SECRET!
        ) as UserToken;

        const userDb = await User.findById(userToken.id);
        if (!userDb) {
            return res
                .status(400)
                .json({ message: 'This account no longer exists.' });
        }

        if (userDb.emailVerified) {
            return res.status(400).json({ message: 'User already activated.' });
        }

        await User.findByIdAndUpdate(userDb.id, { emailVerified: true });

        res.json({
            message: 'Your account has been successfully verified.',
        });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}
