
export const AddToWatchlist = (data) => {
    return {
        type: "ADD-TO-WATCHLIST",
        payload: data
    }
}


export const RemoveFromwatchlist = (data) => {
    return {
        type: "REMOVE-FROM-WATCHLIST",
        payload: data
    }
}