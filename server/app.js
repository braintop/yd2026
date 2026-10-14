let express = require('express'); 
let app = express(); 
const { sql } = require('./db');


let products = [
    {
        id: 1,
        name: 'Product 1',
        price: 100
    },
    {
        id: 2,
        name: 'Product 2',
        price:200
    },
]

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
app.get('/about', (req, res) => {
    res.send('about page');
});

app.get('/contact', (req, res) => {
    res.send('contact page');
});
app.get('/products', (req, res) => {
    res.json(products);
});


app.post('/products', (req, res) => {
    let product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(product);
    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    let id = req.params.id;
    products = products.filter(product => product.id !== id);
    res.json(products);
});

app.put('/products/:id', (req, res) => {
    let id = req.params.id;
    let product = products.find(product => product.id === id);
    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});