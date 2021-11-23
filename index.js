const express = require('express');
const cors = require('cors');
const main = require('./src/database/connectBD');
const spots = require('./src/routes/routesSpots');
const auth = require('./src/routes/authRoutes');


const app = express();
app.use(express.json())

const corsOptions = {
    "Access-Control-Allow-Methods": ['GET', 'PUT', 'POST', 'DELETE']
}
app.use(cors(corsOptions));

//conectamos la BD
main()

app.use('/api/spots', spots)
app.use('/api/user', auth)

app.listen(4000, ()=> {
    console.log('App is running on port 4000')
})