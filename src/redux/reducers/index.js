import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import menuReducer from './menuReducer';
import recentActivityReducer from './recentActivityReducer';
import transcriptsReducer from './transcriptsReducer';
import emailsReducer from './emailsReducer';
import contactsReducer from './contactsReducer';

const rootReducer = combineReducers({
  entities: combineReducers({
    call: combineReducers({
      recentActivity: recentActivityReducer
    }),
    emails: emailsReducer,
    transcripts: transcriptsReducer,
    contacts: contactsReducer
  }),
  ui: combineReducers({
    menu: menuReducer,
    modal: modalReducer
  })
});

export default rootReducer;
