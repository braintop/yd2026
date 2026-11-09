let express = require('express');
let app = express();
let port = 3000;
import { sql } from '@neondatabase/serverless';
import cityRoute from './routes/cityRoute';


app.use('/cities', cityRoute);


app.get('/doctors', async (req, res) => {
    const doctors = await sql`SELECT fullname, prices, city_name FROM doctors JOIN cities ON doctors.city_id = cities.city_id`;
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



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});