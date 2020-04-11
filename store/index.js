import React, {createContext, useReducer} from 'react';
import moment from 'moment';
import getSavedData from '../utils/getSavedData';

let store;

const getInitialState = async () => {
  let defaultData = {
    name: '',
    startDate: moment().startOf('day'),
    daysLength: 14,
    symptomsByDay: [],
    doctorEmail: ''
  };

  let savedData = await getSavedData('info');
  let data;

  if(savedData) {
    data = {
      ...defaultData,
      ...savedData
    }
  }

  return data || defaultData;
};

const createStateProvider = async () => {
  const initialState = await getInitialState();

  store = createContext(initialState);
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
  
        case 'SET_SYMPTOMS':
          ({symptomsByDay} = action.payload);
          return {...state, symptomsByDay};

        case 'SET_DOCTOR_EMAIL':
          ({doctorEmail} = action.payload);
          return {...state, doctorEmail};
  
        default:
          throw new Error();
      };
    }, initialState);
  
    return <Provider value={{state, dispatch}}>{children}</Provider>;
  };

  return StateProvider;
};

export { store, createStateProvider };