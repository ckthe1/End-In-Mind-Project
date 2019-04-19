
const EventDialog = (state = false, action) => {
  switch (action.type) {
    case 'EVENT_DIALOG': return action.payload;
    default: return state;
  }
};

export default EventDialog;