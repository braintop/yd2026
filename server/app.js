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

app.delete('/', async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await sql`DELETE FROM persons WHERE id = ${id}`;
        res.json(rows);
    } catch (error) {
        console.error(error);
    }
});


app.post('/', async (req, res) => {
    try {
        const { name, age } = req.body;
        const rows = await sql`INSERT INTO persons (name, age) VALUES (${name}, ${age})`;
        res.json(rows);
    } catch (error) {
        console.error(error);
    }
});
// תקימו טבלה עם שדה id and city_name 
// תוסיפו 3 שורות לטבלה 
// הציכגו ב node crud מלא עובד 


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});