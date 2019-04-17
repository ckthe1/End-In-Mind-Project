import events from '../../events';

const Events = (state = events, action) => {
  switch (action.type) {

    case 'ADD_EVENT': 
      return [ ...state, action.payload ]

      // Expecting payload to be an ID
    case 'REMOVE_EVENT': {
      return state.filter(event => event.id !== action.payload);
    }

    default: return state;
  }
};

export default Events;