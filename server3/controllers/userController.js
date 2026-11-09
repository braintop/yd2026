const { sql } = require('../db');
const jwt = require('jsonwebtoken');
exports.getUsers = async (req, res) => {
    const users = await sql`SELECT * FROM users`;
    res.json(users);
};

exports.register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const user = await sql`INSERT INTO users (first_name,last_name,email, password) VALUES (${first_name}, ${last_name}, ${email}, ${password})`;
    res.json(user);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await sql`SELECT * FROM users WHERE email = ${email} AND password = ${password}`;
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '10h' });
    res.json({ token });
};

