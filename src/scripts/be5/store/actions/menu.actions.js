import be5 from "../../be5";
import * as types from '../constants/menu.constants';


export const fetchMenu = (path) => {
  return dispatch => {
    be5.net.request(path, {}, data => {
      dispatch({type: types.UPDATE_MENU, data: data});
    });
  };
};

export const updateMenu = (data) => {
  return {type: types.UPDATE_MENU, data: data};
};
