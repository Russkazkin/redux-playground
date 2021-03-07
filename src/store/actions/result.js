import {DELETE_RESULT, STORE_RESULT} from "./actionTypes";

const saveResult = (result) => {
    return {
        type: STORE_RESULT,
        result
    }
}

export const storeResult = (result) => {
    return async dispatch => {
        try {
            setTimeout(() => {
                dispatch(saveResult(result));
            }, 2000);
        } catch (e) {
            console.log(e.response);
        }
    }
};
export const deleteResult = (id) => {
    return {
        type: DELETE_RESULT,
        id
    }
};