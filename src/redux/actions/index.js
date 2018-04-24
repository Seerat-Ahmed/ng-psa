import {
  SHOW_MENU,
  HIDE_MENU,
  SHOW_MODAL,
  HIDE_MODAL,
  GET_ACTIVITY_REQUEST,
  SAVE_ACTIVITY_REQUEST,
  GET_EMAILS_REQUEST,
  GET_TRANSCRIPTS_REQUEST,
  GET_CONTACTS_REQUEST
} from './constants';

// toggle side menu
export const showMenu = () => ({ type: SHOW_MENU });
export const hideMenu = () => ({ type: HIDE_MENU });

// toggle modal
export const showModal = modalType => ({ type: SHOW_MODAL, modalType });
export const hideModal = () => ({ type: HIDE_MODAL });

// get recent activity
export const getActivityRequest = () => ({ type: GET_ACTIVITY_REQUEST });

// post recent activity
export const saveActivityRequest = payload => ({ type: SAVE_ACTIVITY_REQUEST, payload });

// fetch dummy email
export const getEmailsRequest = () => ({ type: GET_EMAILS_REQUEST });

// fetch transcripts
export const getTranscriptsRequest = () => ({ type: GET_TRANSCRIPTS_REQUEST });

// fetch contacts
export const getContactsRequest = () => ({ type: GET_CONTACTS_REQUEST });
