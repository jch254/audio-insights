import { Map } from 'immutable';

import {
  TERM_CHANGE,
  TOGGLE_DROPDOWN,
  OPEN_MODAL,
  CLOSE_MODAL,
} from './actions';

export const initialState = new Map({
  currentTerm: 'long_term',
  dropdownOpen: false,
  modalOpen: false,
  selectedTrackId: null,
});

export default function app(state = initialState, action) {
  switch (action.type) {
    case TERM_CHANGE:
      return state.set('currentTerm', action.term);
    case TOGGLE_DROPDOWN:
      return state.set('dropdownOpen', !state.get('dropdownOpen'));
    case OPEN_MODAL:
      return state.merge({
        modalOpen: true,
        selectedTrackId: action.trackId,
      });
    case CLOSE_MODAL:
      return state.merge({
        modalOpen: false,
        selectedTrackId: null,
      });
    default:
      return state;
  }
}
