import firebase from '../firebase';
import _ from 'lodash';

export const FETCH_<%= modelPlural.toUpperCase() %> = 'FETCH_<%= modelPlural.toUpperCase() %>';
export const RECEIVE_<%= modelPlural.toUpperCase() %> = 'RECEIVE_<%= modelPlural.toUpperCase() %>';
export const fetchVideos = () => {
  return (dispatch, getState) => {
    dispatch({type: FETCH_<%= modelPlural.toUpperCase() %>})
    firebase.firestore()
      .collection(`<%= modelPlural %>`)
      .get()
      .then((querySnapshot) => {

        return dispatch({
          type: RECEIVE_<%= modelPlural.toUpperCase() %>,
          <%= modelPlural %>: _.map(querySnapshot.docs, <%= modelSingular %> => <%= modelSingular %>.data())
        });
      });
  }
}