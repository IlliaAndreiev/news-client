import { TOGGLE_TOASTR } from '../constants';

export function toggleToastr(payload) {
    return { type: TOGGLE_TOASTR, payload};
}