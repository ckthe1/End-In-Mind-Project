
// Determines how we're viewing the selected event. 'none', 'view', 'edit', or 'new'
const EventType = (state = 'none', action) => {
  switch (action.type) {

    case 'SET_EVENT_TYPE': return action.payload;

    default: return state;
  }
};

export default EventType;