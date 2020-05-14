const initialState = {
    authPopup: true,
    exercisePopup: false,
};

export default function isVisiblePopup (state = initialState, action){
    switch (action.type) {
        case 'CHANGE_VISIBILITY_AUTH_POPUP':
            return { ...state, authPopup: !state.authPopup };

        case 'CHANGE_VISIBILITY_EXERCISE_POPUP':
            return { ...state, exercisePopup: !state.exercisePopup };

        default:
            return state;
    }
}