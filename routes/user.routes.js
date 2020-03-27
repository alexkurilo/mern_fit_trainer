const {Router} = require('express');
const User = require('../models/User');

const router = Router();

router.post('/', async (request, response) => {
        try {
            const userData = request.body;
            const userCandidate = await User.findOne({ email: userData.email });

            if (userCandidate) {
                return response.status(200).json({data: userCandidate});
            }

            const user = new User(userData);
            await user.save();

            response.status(201).json({data: userData});
        } catch (e) {
            response.status(500).json({message: 'Sorry, such user was not found and failed to create it.'});
        }
    }
);

module.exports = router;
