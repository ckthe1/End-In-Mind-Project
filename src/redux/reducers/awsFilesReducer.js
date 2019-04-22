

const AWS = (state = [], action) => {
  switch (action.type) {

    case 'SET_FILES': return action.payload;    

    default: return state;
  }
};

export default AWS;