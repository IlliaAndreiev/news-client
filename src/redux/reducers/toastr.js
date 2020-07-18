import { TOGGLE_TOASTR } from '../constants';

const defaultState = {
    show: false,
    color: '',
    status: '',
    text: '',
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case TOGGLE_TOASTR:
            return {
                ...state,
                show: action.payload.show,
                color: action.payload.color,
                status: action.payload.status,
                text: action.payload.text
            }
            
        default:
            return state;
    }
}