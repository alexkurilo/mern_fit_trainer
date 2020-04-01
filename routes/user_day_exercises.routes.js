const {Router} = require('express');

const UserDayExercise = require('../models/UserDayExercise');

const router = Router();

router.get('/:user_id', async (request, response) => {
        try {
            const userId = request.params.user_id;
            const datesList = await UserDayExercise
                .find({
                    user_id: userId,
                },
                {
                    date: 1,
                    _id: 0,
                })
                .sort({date: 1});

            let result = {};
            datesList.forEach(item => result[item.date] = item.date);

            response.status(200).json(Object.keys(result));
        } catch (e) {
            response.status(500).json({message: 'Sorry, such date was not found.'});
        }
    }
);

router.get('/:user_id/:date', async (request, response) => {
        try {
            const userId = request.params.user_id;
            const date = request.params.date;

            const exercisesList = await UserDayExercise.find({
                user_id: userId,
                date: date,
            });

            response.status(200).json({data: exercisesList});
        } catch (e) {
            response.status(500).json({message: 'Sorry, such exercise was not found.'});
        }
    }
);

module.exports = router;