//ACTION CREATOR IS A FUNCTION THAT RETURNS THE ACTION OBJECT AND HAS A TYPE PROPERTY, PLUS ANY DATA (PAYLOAD) TO SEND TO THE STORE TO UPDATE IT
//EACH ACTION WILL BE CONNECTED TO A REACT COMPONENT USING THE connect() FUNCTION AND A mapDispatchToProps ARGUMENT

import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
//import AddProduct from "../components/NewProductComponent";

// export const fetchComments = () => (dispatch) => {
//   return fetch(baseUrl + "comments")
//     .then(
//       (response) => {
//         if (response.ok) {
//           return response;
//         } else {
//           const error = new Error(
//             `Error ${response.status}: ${response.statusText}`
//           );
//           error.response = response;
//           throw error;
//         }
//       },
//       (error) => {
//         const errMess = new Error(error.message);
//         throw errMess;
//       }
//     )
//     .then((response) => response.json())
//     .then((comments) => dispatch(addComments(comments)))
//     .catch((error) => dispatch(commentsFailed(error.message)));
// };

// export const commentsFailed = (errMess) => ({
//   type: ActionTypes.COMMENTS_FAILED,
//   payload: errMess,
// });

// export const addComments = (comments) => ({
//   type: ActionTypes.ADD_COMMENTS,
//   payload: comments,
// });

//======================================

export const fetchProductos = () => (dispatch) => {
  dispatch(productosLoading());

  return fetch(baseUrl + "productos")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((productos) => dispatch(addProductos(productos)))
    .catch((error) => dispatch(productosFailed(error.message)));
};

export const productosLoading = () => ({
  type: ActionTypes.PRODUCTOS_LOADING,
});

export const productosFailed = (errMess) => ({
  type: ActionTypes.PRODUCTOS_FAILED,
  payload: errMess,
});

export const addProductos = (productos) => ({
  type: ActionTypes.ADD_PRODUCTOS,
  payload: productos,
});

// export const fetchPromotions = () => (dispatch) => {
//   dispatch(promotionsLoading());

//   return fetch(baseUrl + "promotions")
//     .then(
//       (response) => {
//         if (response.ok) {
//           return response;
//         } else {
//           const error = new Error(
//             `Error ${response.status}: ${response.statusText}`
//           );
//           error.response = response;
//           throw error;
//         }
//       },
//       (error) => {
//         const errMess = new Error(error.message);
//         throw errMess;
//       }
//     )
//     .then((response) => response.json())
//     .then((promotions) => dispatch(addPromotions(promotions)))
//     .catch((error) => dispatch(promotionsFailed(error.message)));
// };

// export const promotionsLoading = () => ({
//   type: ActionTypes.PROMOTIONS_LOADING,
// });

// export const promotionsFailed = (errMess) => ({
//   type: ActionTypes.PROMOTIONS_FAILED,
//   payload: errMess,
// });

// export const addPromotions = (promotions) => ({
//   type: ActionTypes.ADD_PROMOTIONS,
//   payload: promotions,
// });

// export const fetchPartners = () => (dispatch) => {
//   dispatch(partnersLoading());

//   return fetch(baseUrl + "partners")
//     .then(
//       (response) => {
//         if (response.ok) {
//           return response;
//         } else {
//           const error = new Error(
//             `Error ${response.status}: ${response.statusText}`
//           );
//           error.response = response;
//           throw error;
//         }
//       },
//       (error) => {
//         const errMess = new Error(error.message);
//         throw errMess;
//       }
//     )
//     .then((response) => response.json())
//     .then((partners) => dispatch(addPartners(partners)))
//     .catch((error) => dispatch(partnersFailed(error.message)));
// };

// export const partnersLoading = () => ({
//   type: ActionTypes.PARTNERS_LOADING,
// });

// export const partnersFailed = (errMess) => ({
//   type: ActionTypes.PARTNERS_FAILED,
//   payload: errMess,
// });

// export const addPartners = (partners) => ({
//   type: ActionTypes.ADD_PARTNERS,
//   payload: partners,
// });

// export const postFavorite = (campsiteId) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(addFavorite(campsiteId));
//   }, 2000);
// };

// export const addFavorite = (campsiteId) => ({
//   type: ActionTypes.ADD_FAVORITE,
//   payload: campsiteId,
// });

//===========WEEK2-TASK3 ADDING 2 CREATOR FUNCTIONS: postComment and addComment

export const postProduct = (name, stock, unidad, preciounitario) => (dispatch) => {
  const NewProduct = {
    name,
    stock,
    unidad,
    preciounitario,
  };
  //newComment.date = new Date().toISOString();

  return fetch(baseUrl + 'productos', {
    method: "POST",
    body: JSON.stringify(NewProduct),
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => {
        if (response.ok) {
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => { throw error; }
)
.then(response => response.json())
.then(response => dispatch(AddProduct(response)))
.catch(error => {
    console.log('post product', error.message);
    alert('Your product could not be posted\nError: ' + error.message);
});
};

export const AddProduct = (product) => ({
  type: ActionTypes.CREATE_PRODUCT,
  payload: product,
});

//==============FIN DE WEEK2-TASK3==============================

// export const deleteFavorite = campsiteId => ({
//   type: ActionTypes.DELETE_FAVORITE,
//   payload: campsiteId
// });