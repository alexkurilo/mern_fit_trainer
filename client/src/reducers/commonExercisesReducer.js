const initialState = [];

export default function commonExercises (state = initialState, action){
    switch (action.type) {
        case 'SAVE_COMMON_EXERCISES':
            return [...action.payload];

        default:
            return [...state];
    }
}