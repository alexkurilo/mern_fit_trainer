const {Router} = require('express');
const Auth = require('../models/Auth');

const router = Router();

router.post('/', async (request, response) => {
        try {
            const requestData = request.body;
            const data = await Auth.findOne(requestData);

            response.status(200).json({data: data});
        } catch (e) {
            response.status(500).json({message: 'Sorry, such auth was not found.'});
        }
    }
);

module.exports = router;