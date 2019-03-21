import { CHANGE_VALUE, ADD_ITEM, DELETE_ITEM } from "../constants";

export const changevalue = (value: any) => {
  return {
    type: CHANGE_VALUE,
    value
  };
};

export const additem = () => {
  return {
    type: ADD_ITEM
  };
};

export const deleteitem = (index: number) => {
  return {
    type: DELETE_ITEM,
    index
  };
};
