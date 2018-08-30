import { model_wiki, model_snack } from "../constants/Models";

const Types = {
  SNACK: 'SNACK',
}

export const Actions = {
  snack: payload => ({ type: Types.SNACK, payload }),
}

export const initialState = model_snack({});

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case Types.SNACK:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}