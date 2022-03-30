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

    //WEEK2-TASK3 handling ADD_COMMENT
        case ActionTypes.CREATE_PRODUCT:
            const product = action.payload;
            product.id = state.productos.length;
            return {...state, productos: state.productos.concat(product)};
            

        default:
            return state;
      }
};