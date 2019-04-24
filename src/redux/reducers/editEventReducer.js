const editEventReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_EDIT': return action.payload;
        // case 'GET_EDIT_INFO': return action.payload;
        default: return state;
    }
};

export default editEventReducer;