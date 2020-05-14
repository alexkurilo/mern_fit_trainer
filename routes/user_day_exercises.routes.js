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
            }).sort( { index : 1 } );

            response.status(200).json(exercisesList);
        } catch (e) {
            response.status(500).json({message: 'Sorry, such exercise was not found.'});
        }
    }
);

router.post('/', async (request, response) => {
        try {
            const exercise = request.body;

            const newExercise = new UserDayExercise(exercise);
            await newExercise.save();

            response.status(200).json(exercise);
        } catch (e) {
            response.status(500).json({message: 'Sorry, such exercise not create.'});
        }
    }
);

router.put('/:exercise_id', async (request, response) => {
        try {
            const exercise = request.body;

            await UserDayExercise.updateOne({_id: exercise._id,},
                exercise,
                {upsert: true});

            response.status(200).json(exercise);
        } catch (e) {
            response.status(500).json({message: 'Sorry, such exercise was not found.'});
        }
    }
);

router.delete('/:exercise_id', async (request, response) => {
        try {
            const exerciseId = request.params.exercise_id;
            const result = await UserDayExercise.deleteOne({_id: exerciseId});
            response.status(200).json(result);
        } catch (e) {
            response.status(500).json({message: 'Sorry, such exercise was not found.'});
        }
    }
);

module.exports = router;