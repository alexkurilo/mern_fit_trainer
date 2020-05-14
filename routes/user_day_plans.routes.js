const {Router} = require('express');
const UserDayPlans = require('../models/UserDayPlan');

const router = Router();

router.get('/:user_id/:date', async (request, response) => {
        try {
            const userId = request.params.user_id;
            const date = request.params.date;

            const plan = await UserDayPlans.findOne({
                user_id: userId,
                date: date,
            });

            response.status(200).json(plan);
        } catch (e) {
            response.status(500).json({message: 'Sorry, such plan was not found.'});
        }
    }
);

module.exports = router;