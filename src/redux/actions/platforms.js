import { ADD_PLATFORM, SET_PLATFORMS, UPDATE_PLATFORM, DELETE_PLATFORM} from '../constants';

export function addPlatform(payload) {
    return { type: ADD_PLATFORM, payload};
}

export function setPlatforms(payload) {
    return { type: SET_PLATFORMS, payload };
}

export function updatePlatform(payload) {
    return { type: UPDATE_PLATFORM, payload };
}

export function deletePlatform(payload) {
    return { type: DELETE_PLATFORM, payload };
}