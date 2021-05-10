const initState = {
    app: 'asset'
}

export default function appReducer(state = initState, action) {
    switch (action.type) {
        case "app":
            return {
                ...state,
                app: action.payload
            }
        default:
            return state;
    }
}