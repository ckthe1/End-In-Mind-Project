
const Events = (state = [], action) => {
  switch (action.type) {

    case 'SET_EVENTS': return action.payload;

      // Expecting payload to be an ID
    case 'REMOVE_EVENT': {
      return state.filter(event => event.id !== action.payload);
    }

    default: return state;
  }
};

export default Events;