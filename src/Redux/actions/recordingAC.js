
export const setRecordings = (obj) => ({
    type: "SET_RECORDINGS",
    payload: obj
})

export const addRecording = (obj) => ({
    type: "ADD_RECORDING",
    payload: obj
})

export const deleteRecording = (id) => ({
    type: "DELETE_RECORDING",
    payload: id
})


