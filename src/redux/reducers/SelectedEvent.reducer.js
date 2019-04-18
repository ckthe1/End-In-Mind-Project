
const SelectedEvent = (state = {}, action) => {
  switch (action.type) {

    case 'SET_EVENT': return action.payload;
    case 'CLEAR_EVENT': return {};
    default: return state;
  }
};

export default SelectedEvent;