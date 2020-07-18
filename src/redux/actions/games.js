import { ADD_GAME, SET_GAMES, UPDATE_GAME, DELETE_GAME, } from '../constants';

export function addGame(payload) {
    return { type: ADD_GAME, payload};
}

export function setGames(payload) {
    return { type: SET_GAMES, payload };
}

export function updateGame(payload) {
    return { type: UPDATE_GAME, payload };
}

export function deleteGame(payload) {
    return { type: DELETE_GAME, payload };
}