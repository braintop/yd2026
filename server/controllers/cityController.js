const { sql } = require('../db');

exports.getCites=  async (req, res) => {
    const cities = await sql`SELECT * FROM cities`;
    res.json(cities);
};

exports.createCity = async (req, res) => {
    const { city_name } = req.body;
    const city = await sql`INSERT INTO cities (city_name) VALUES (${city_name})`;
    res.json(city);
};

exports.updateCity=  async (req, res) => {
    const { id } = req.params;
    const { city_name } = req.body;
    const city = await sql`UPDATE cities SET city_name = ${city_name} WHERE city_id = ${id}`;
    res.json(city);
};

exports.deleteCity = async (req, res) => {
    const { id } = req.params;
    const city = await sql`DELETE FROM cities WHERE city_id = ${id}`;
    res.json(city);
};

exports.getCityById = async (req, res) => {
    const { id } = req.params;
    const city = await sql`SELECT * FROM cities WHERE city_id = ${id}`;
    res.json(city);
};