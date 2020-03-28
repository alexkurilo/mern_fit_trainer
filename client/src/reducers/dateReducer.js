const initialState = [];

export default function date (state = initialState, action){
    switch (action.type) {
        case 'SAVE_DATES':
            return [...action.payload];

        case 'ADD_DATE':
            state = state.includes(action.payload) ? state : state.concat(action.payload);
            return [...state];

        default:
            return [...state];
    }
}