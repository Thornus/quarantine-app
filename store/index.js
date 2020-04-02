import React, {createContext, useReducer} from 'react';
import moment from 'moment';

const initialState = {
  name: '',
  startDate: moment(),
  daysLength: 14
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'SET_NAME':
        ({name} = action.payload);
        return {...state, name};

      case 'SET_START_DATE':
        ({startDate} = action.payload);
        return {...state, startDate};

      case 'SET_DAYS_LENGTH':
        ({daysLength} = action.payload);
        return {...state, daysLength};

      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export { store, StateProvider }