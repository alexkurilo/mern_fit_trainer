const {Router} = require('express');

const CommonExercise = require('../models/CommonExercise');

const router = Router();

router.get('/', async (request, response) => {
        try {
            const exercisesList = await CommonExercise.find();
            response.status(200).json(exercisesList);
        } catch (e) {
            response.status(500).json({message: 'Sorry, such exercise was not found.'});
        }
    }
);

module.exports = router;