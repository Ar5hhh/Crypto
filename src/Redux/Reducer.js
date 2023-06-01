import { combineReducers } from "redux"



let Reducer = (state = [], Action) => {
    switch (Action.type) {
        case "ADD-TO-WATCHLIST":
            return [...state, Action.payload]

        case "REMOVE-FROM-WATCHLIST":
            return state.filter((s) => {
                if (s.id !== Action.payload.id) return [...state, s]
                return null

            })
        default:
            return state
    }
}

let rootreducer = combineReducers({ Reducer })

export default rootreducer