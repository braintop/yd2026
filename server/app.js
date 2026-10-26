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
    const city = await sql`UPDATE cities SET city_name = ${city_name} WHERE city_id = ${id}`;
    res.json(city);
});

app.delete('/cities/:id', async (req, res) => {
    const { id } = req.params;
    const city = await sql`DELETE FROM cities WHERE city_id = ${id}`;
    res.json(city);
});


app.get('/cities/:id', async (req, res) => {
    const { id } = req.params;
    const city = await sql`SELECT * FROM cities WHERE city_id = ${id}`;
    res.json(city);
});


app.get('/doctors', async (req, res) => {
    const doctors = await sql`SELECT * FROM doctors`;
    res.json(doctors);
});

app.post('/doctors', async (req, res) => {
    const { fullname, prices, city_id } = req.body;
    const doctor = await sql`INSERT INTO doctors (fullname, prices, city_id) VALUES (${fullname}, ${prices}, ${city_id})`;
    res.json(doctor);
});

app.put('/doctors/:id', async (req, res) => {
    const { id } = req.params;
    const { fullname, prices, city_id } = req.body;
    const doctor = await sql`UPDATE doctors SET fullname = ${fullname}, prices = ${prices}, city_id = ${city_id} WHERE doctor_id = ${id}`;
    res.json(doctor);
});

app.delete('/doctors/:id', async (req, res) => {
    const { id } = req.params;
    const doctor = await sql`DELETE FROM doctors WHERE doctor_id = ${id} RETURNING *`;
    res.json(doctor);
});

app.get('/doctors/:id', async (req, res) => {
    const { id } = req.params;
    const doctor = await sql`SELECT * FROM doctors WHERE doctor_id = ${id} RETURNING *`;
    res.json(doctor);
});
//sasasasdwdwd
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});