const {Router} = require('express');

const UserDayExercise = require('../models/UserDayExercise');

const router = Router();

router.get('/:user_id/:date', async (request, response) => {
        try {
            // const exercisesList = await UserExercise.find();
            //
            // response.status(200).json({data: exercisesList});
            const body = request.body;
            console.log('body: ', body);
            // debugger;
            const userGayExerciseData1 = {
                client_id: '5e789daa6834e397610339e2',
                date:'2020-03-27',
                name: 'chest press',
                type: 'kg',
                quantity: 100,
                index: 2,
            };
            const userDayExercise1 = new UserDayExercise(userGayExerciseData1);
            await userDayExercise1.save();

            const userGayExerciseData2 = {
                client_id: '5e789daa6834e397610339e2',
                date:'2020-03-27',
                name: 'run',
                type: 'min',
                quantity: 10,
                index: 3,
            };
            const userDayExercise2 = new UserDayExercise(userGayExerciseData2);
            await userDayExercise2.save();

            const userGayExerciseData3 = {
                client_id: '5e789daa6834e397610339e2',
                date:'2020-03-27',
                name: 'bench press',
                type: 'iterations',
                quantity: 100,
                index: 1,
            };
            const userDayExercise3 = new UserDayExercise(userGayExerciseData3);
            await userDayExercise3.save();


            response.status(200).json({data: 'OK'});
        } catch (e) {
            response.status(500).json({message: 'Sorry, such exercise was not found.'});
        }
    }
);

module.exports = router;