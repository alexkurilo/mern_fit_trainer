const initialExercise = {
    name: null,
    type: null,
    quantity: null,
    index: null,
};

const initialExercises = [];

export default function userDayExercises (state = initialExercises, action){
    switch (action.type) {
        case "SAVE_USER_DAY_EXERCISES":
            return [
                ...action.payload
            ];

        default:
            return [
                ...state
            ];
    }
}