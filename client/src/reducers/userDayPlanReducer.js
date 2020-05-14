const initialPlan = [];

export default function userDayPlan (state = initialPlan, action){
    switch (action.type) {
        case "SET_USER_DAY_PLANS":
            return [
                ...action.payload
            ];

        default:
            return [
                ...state
            ];
    }
}