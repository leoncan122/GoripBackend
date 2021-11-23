const User  = require('../database/userSchema');

exports.signUp = async (req, res) => {
    const body = req.body;

    try {
        const newUser = new User(body);
        await newUser.save();

        res.status(200).send({msg: 'Signed up'});

    } catch (error) {
        res.status(500).send({msg: error})
    }
}

exports.login = async (req, res) => {
    const body = req.body;

    try {
        const checkUser = await User.find(body);

        if(checkUser.length < 1) {
            return res.status(404).send({msg: 'User not found'});
        }

        res.status(200).send({msg: 'loged'});

    } catch (error) {
        res.status(500).send({msg: error})
    }
}
