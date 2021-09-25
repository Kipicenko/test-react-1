
const initialState = {
    items: []
}

export const recordingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_RECORDINGS":
            return {
                ...state,
                items: action.payload
            }
        case "ADD_RECORDING":
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case "DELETE_RECORDING":
            return {
                ...state,
                items: [...state.items].filter(item => action.payload !== item.id)
            }
        default:
            return state;
    }
}