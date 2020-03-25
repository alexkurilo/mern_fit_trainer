const initialState = {
    name: null,
    email: null,
    img: null,
    fitPlans: null,
};

export default function user (state = initialState, action){
    switch (action.type) {
        case "SAVE_USER":
            return {
                ...state,
                ...action.payload
            };

        case 'REMOVE_USER':
            return {
                ...initialState
            };

        default:
            return {
                ...state
            };
    }
}