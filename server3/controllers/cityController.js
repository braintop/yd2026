const { sql } = require('../db');

exports.getCities = async (req, res) => {
    try {
       // const { user } = req.user;
        const cities = await sql`SELECT * FROM cities`;
        res.json(cities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCity = async (req, res) => {
    try {
        const { name } = req.body || {};
        if (!name) {
            return res.status(400).json({ message: 'name is required' });
        }
        const [city] = await sql`INSERT INTO cities (city_name) VALUES (${name}) RETURNING *`;
        res.status(201).json(city);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body || {};
        if (!name) {
            return res.status(400).json({ message: 'name is required' });
        }
        const [city] = await sql`UPDATE cities SET city_name = ${name} WHERE city_id = ${id} RETURNING *`;
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.json(city);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        const [city] = await sql`DELETE FROM cities WHERE city_id = ${id} RETURNING *`;
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.json(city);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
