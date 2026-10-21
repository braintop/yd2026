let express = require('express'); 
let app = express(); 
const { sql } = require('./db');



app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const rows = await sql`SELECT * FROM persons`;

        res.json(rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'שגיאה בשליפת הנתונים'
        });
    }
});
app.get('/:id', async (req, res) => {
    try {
        const rows = await sql`SELECT * FROM persons WHERE person_id = ${req.params.id}`;

        res.json(rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'שגיאה בשליפת הנתונים'
        });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await sql`DELETE FROM persons WHERE person_id = ${id}`;
        res.json(rows);
    } catch (error) {
        console.error(error);
    }
});


app.post('/', async (req, res) => {
    try {
        const { fullname, city_id } = req.body;
        console.log(fullname, city_id);
        const rows = await sql`INSERT INTO persons (fullname, city_id) VALUES (${fullname}, ${city_id}) RETURNING *`;
        res.json(rows);
    } catch (error) {
        console.error(error);
    }
});
// תקימו טבלה עם שדה id and city_name 
// תוסיפו 3 שורות לטבלה 
// הציכגו ב node crud מלא עובד 


app.listen(4000, () => {
    console.log('Server is running on port 3000');
});