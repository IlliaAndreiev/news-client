import { ADD_GAME, SET_GAMES, UPDATE_GAME, DELETE_GAME } from '../constants';

const defaultState = {
    games: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ADD_GAME:
            return {
                ...state,
                games: state.games.concat(action.payload)
            }

        case SET_GAMES:
            return {
                ...state,
                games: action.payload
            }

        case UPDATE_GAME:
            return {
                ...state,
                games: state.games.map(game => {
                    if (game._id === action.payload._id) {
                        return action.payload;
                    }

                    return game;
                })
            }

        case DELETE_GAME:
            return {
                ...state,
                games: state.games.filter(game => game._id !== action.payload)
            }
            
        default:
            return state;
    }
}