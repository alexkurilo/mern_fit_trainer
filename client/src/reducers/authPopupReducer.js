const initialState = true;

export default function isVisibleAuthPopup (state = initialState, action){
    switch (action.type) {
        case 'CHANGE_VISIBILITY_AUTH_POPUP':
            return !state;

        default:
            return state;
    }
}