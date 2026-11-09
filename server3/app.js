let express = require('express');
let app = express();
let port = 3000;
let cityRoute = require('./routes/cityRoute');
let userRoute = require('./routes/userRoutes');

app.use(express.json());

app.use('/cities', cityRoute);
app.use('/users', userRoute);





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});