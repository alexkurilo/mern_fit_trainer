const {Router} = require('express');
const Exercise = require('../models/Exercise');

const router = Router();

router.get('/', async (request, response) => {
        try {
            const exercisesList = await Exercise.find();

            response.status(200).json({data: exercisesList});
        } catch (e) {
            response.status(500).json({message: 'Sorry, such exercise was not found.'});
        }
    }
);

module.exports = router;