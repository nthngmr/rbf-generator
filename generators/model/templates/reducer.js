import _ from 'lodash';
import {
  RECEIVE_<%= modelPlural.toUpperCase() %>,
  FETCH_<%= modelPlural.toUpperCase() %>
} from './../actions/<%= modelPlural %>';

const initialState = {
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_<%= modelPlural.toUpperCase() %>:
      let newState = _.reduce(action.<%= modelPlural %>, (current, <%= modelSingular %>) => {
        _.set(current, `${<%= modelSingular %>.id}`, <%= modelSingular %>);
        return current;
      }, {});
      return newState
    default:
      return state;
  }
}

export default auth;
