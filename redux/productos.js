import * as ActionTypes from './ActionTypes';

export const productos = (state = { isLoading: true,
                                     errMess: null,
                                     productos: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PRODUCTOS:
            return {...state, isLoading: false, errMess: null, productos: action.payload};

        case ActionTypes.PRODUCTOS_LOADING:
            return {...state, isLoading: true, errMess: null, productos: []}

        case ActionTypes.PRODUCTOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};