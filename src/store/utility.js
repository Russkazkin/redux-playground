export const updateObject = (oldObject, updateValued) => {
    return {
        ...oldObject,
        ...updateValued
    }
};