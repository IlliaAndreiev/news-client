import { combineReducers } from 'redux'
import games from './games'
import platforms from './platforms'
import toastr from './toastr'

export default combineReducers({
  gamesReducer: games,
  platformsReducer: platforms,  
  toastrReducer: toastr,
})