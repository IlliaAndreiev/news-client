import { ADD_PLATFORM, SET_PLATFORMS, UPDATE_PLATFORM, DELETE_PLATFORM } from '../constants';

const defaultState = {
    platforms: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PLATFORM:
            return {
                ...state,
                platforms: state.platforms.concat(action.payload)
            }

        case SET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }

        case UPDATE_PLATFORM:
            return {
                ...state,
                platforms: state.platforms.map(platform => {
                    if (platform._id === action.payload._id) {
                        return action.payload;
                    }

                    return platform;
                })
            }

        case DELETE_PLATFORM:
            return {
                ...state,
                platforms: state.platforms.filter(platform => platform._id !== action.payload)
            }
            
        default:
            return state;
    }
}