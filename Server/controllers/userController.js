import User, { findOne, findById } from '../models/User';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

export async function register(req, res) {
    const { name, email, password } = req.body;
    try {
        let user = await findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({ name, email, password });
        await user.save();

        const payload = { user: { id: user.id } };
        sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getUserProfile(req, res) {
    try {
        const user = await findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
