import be5 from "../../be5";
import * as types from '../constants/menu.constants';


export const fetchMenu = () => {
  return dispatch => {
    be5.net.request('menu', {}, data => {
      dispatch({type: types.UPDATE_MENU, data: data});
    });
  };
};
