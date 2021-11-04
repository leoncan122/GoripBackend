const express = require('express');
const cors = require('cors');
const main = require('./src/database/connectBD')
const Spot = require('./src/database/spotSchema')

const app = express();
app.use(express.json())

const corsOptions = {
    "Access-Control-Allow-Methods": ['GET', 'PUT', 'POST', 'DELETE']
}
app.use(cors(corsOptions));

//conectamos la BD
main()

app.post('/api/add-spot', async (req, res) => {
    const spot = req.body;
    
    try {
        const data =  new Spot(spot)
        await data.save() 

        res.status(201).send(spot)
        
    }catch(error) {
        res.status(500).send({msg: error})
    }
})

app.listen(4000, ()=> {
    console.log('App is running on port 4000')
})