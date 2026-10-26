let express = require('express'); 
let app = express(); 
const { sql } = require('./db');



app.use(express.json());

app.get('/cities', async (req, res) => {
    const cities = await sql`SELECT * FROM cities`;
    res.json(cities);
});


app.post('/cities', async (req, res) => {
    const { city_name } = req.body;
    const city = await sql`INSERT INTO cities (city_name) VALUES (${city_name})`;
    res.json(city);
});

app.put('/cities/:id', async (req, res) => {
    const { id } = req.params;
    const { city_name } = req.body;
    const city = await sql`UPDATE cities SET city_name = ${city_name} WHERE id = ${id}`;
    res.json(city);
});

app.delete('/cities/:id', async (req, res) => {
    const { id } = req.params;
    const city = await sql`DELETE FROM cities WHERE id = ${id}`;
    res.json(city);
});


app.get('/cities/:id', async (req, res) => {
    const { id } = req.params;
    const city = await sql`SELECT * FROM cities WHERE id = ${id}`;
    res.json(city);
});

app.listen(4000, () => {
    console.log('Server is running on port 3000');
});