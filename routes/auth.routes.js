const {Router} = require('express');
const Auth = require('../models/Auth');

const router = Router();

router.get('/', async (request, response) => {
        try {
            const authData = await Auth.find();

            response.status(200).json(authData);
        } catch (e) {
            response.status(500).json({message: 'Sorry, such auth was not found.'});
        }
    }
);

module.exports = router;