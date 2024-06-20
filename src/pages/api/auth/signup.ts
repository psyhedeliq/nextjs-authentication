// Next.js API route support: https://nextjs.org/docs/api-routes/introductionimport connectDb from '@/utils/connectDb';
import User from '@/models/User';
import connectDb from '@/utils/connectDb';
import type { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { createActivationToken } from '@/utils/tokens';
import { activateTemplateEmail } from '@/components/emailTemplates/activate';
import sendMail from '@/utils/sendMail';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await connectDb();
        const { first_name, last_name, email, phone, password } = req.body;

        if (!first_name || !last_name || !email || !phone || !password) {
            return res
                .status(400)
                .json({ message: 'Please fill in all fields.' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address.' });
        }

        if (!validator.isMobilePhone(phone)) {
            return res.status(400).json({ message: 'Invalid phone number.' });
        }

        const user = await User.findOne({
            email,
        });
        if (user) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: 'Password must be at least 6 characters.' });
        }

        const encryptedPassword = await bcrypt.hash(password, 12);
        const newUser = await new User({
            name: `${first_name} ${last_name}`,
            email,
            phone,
            password: encryptedPassword,
        });
        await newUser.save();

        const activation_token = createActivationToken({
            id: newUser._id.toString(),
        });
        const url = `${process.env.NEXTAUTH_URL}/activate/${activation_token}`;
        await sendMail(
            newUser.email,
            newUser.name,
            '',
            url,
            'Account Activation',
            activateTemplateEmail
        );

        res.json({
            message:
                'User registered successfully. Please activate your account to continue.',
        });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}
