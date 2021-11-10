const { v4: uuidv4 } = require('uuid');
const Spot = require('../database/spotSchema')


exports.addSpot =  async (req, res) => {
    const spot = req.body;
    console.log(spot)
    
    try {
        const data =  new Spot(spot)
        await data.save() 

        res.status(201).send(spot)
        
    }catch(error) {
        res.status(500).send({msg: error})
    }
}
exports.getSpot =  async (req, res) => {
    const id = req.params.id;
    
    try {
        const spot = await Spot.findById(id);

        res.status(200).send(spot)
        
    }catch(error) {
        res.status(500).send({msg: error})
    }
}
exports.getSpotsAroundMe =  async (req, res) => {
    
    const postalCode = req.params.pc;
    console.log(postalCode)

    try {
        const spot = await Spot.find({postal_code: '37007'})
        
        res.status(200).send(spot);

    }catch(error) {
        res.status(500).send({msg: error});
    }
}