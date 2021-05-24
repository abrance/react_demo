const initState = {
    app: 'asset',
    log: {
        is_log: false,
        success: false,
        logging: false,
        user_info: {}
    }
}

export default function appReducer(state = initState, action) {
    switch (action.type) {
        case "app":
            return {
                ...state,
                app: action.payload
            }
        case "log":
            return {
                ...state,
                log: action.log
            }
        default:
            return state;
    }
}