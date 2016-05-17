export const TERM_CHANGE = 'TERM_CHANGE';
export function termChange(term) {
  return {
    type: TERM_CHANGE,
    term,
  };
}

export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
export function toggleDropdown() {
  return {
    type: TOGGLE_DROPDOWN,
  };
}

export const OPEN_MODAL = 'OPEN_MODAL';
export function openModal(trackId) {
  return {
    type: OPEN_MODAL,
    trackId,
  };
}

export const CLOSE_MODAL = 'CLOSE_MODAL';
export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}
