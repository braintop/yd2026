let express = require('express'); 
let app = express(); 
const { sql } = require('./db');
const cityRoutes = require('./routes/cityRoutes');


app.use(express.json());

app.use('/cities', cityRoutes);

//
app.listen(4001, () => {
    console.log('Server is running on port 4001');
});