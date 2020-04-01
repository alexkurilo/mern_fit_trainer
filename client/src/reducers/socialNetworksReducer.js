const initialState = [];

export default function socialNetworks (state = initialState, action){
    switch (action.type) {
        // case 'SAVE_SOC_NET':
        //     return [...action.payload];

        case 'ADD_SOC_NET':
            state = state.includes(action.payload) ? state : state.concat(action.payload);
            return [...state];

        default:
            return [...state];
    }
}