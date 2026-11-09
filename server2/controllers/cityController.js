const { sql } = require('../db');

exports.getCities =  async (req, res) => {
    const cities = await sql`SELECT * FROM cities`;
    res.json(cities);
};


exports.createCity = async (req, res) => {
    const { name } = req.body;
    const city = await sql`INSERT INTO cities (name) VALUES (${name})`;
    res.json(city);
};

exports.updateCity = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const city = await sql`UPDATE cities SET name = ${name} WHERE id = ${id}`;
    res.json(city);
};
exports.deleteCity = async (req, res) => {
    const { id } = req.params;
    const city = await sql`DELETE FROM cities WHERE id = ${id}`;
    res.json(city);
};





