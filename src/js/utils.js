const deleteEvent = new CustomEvent('custom:delete', {
    bubbles: true
})
const openModalEvent = new CustomEvent('custom:open-modal', {
    bubbles: true
})
const createCommentEvent = new CustomEvent('custom:create-comment')

export { deleteEvent, openModalEvent, createCommentEvent }

export function generateID() {
    return parseInt(Math.ceil(Math.random() * Date.now()))
}

export function getDataJSON(json) {
    const stringFromJSON = JSON.stringify(json)
    const data = JSON.parse(stringFromJSON)
    return data.default
}

export function enableBtn(btn) {
    btn.removeAttribute('disabled');
}

export function disableBtn(btn) {
    btn.setAttribute('disabled', true)
}

export function animate(element, animationClass, animationTime = 500) {
    element.classList.add(animationClass)
    setTimeout(() => element.classList.remove(animationClass), animationTime)
}

export function isUniqueArrayOfObjects(array, key) {
    let flag = true

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[j][key] === array[i][key] && j !== i)
                flag = false
        }
    }
    return flag
}

export function findNestedObjectByKey(object, key, value) {
    let foundObj;
    JSON.stringify(object, (_, nestedValue) => {
        if (nestedValue && nestedValue[key] === value) {
            foundObj = nestedValue;
        }
        return nestedValue;
    });
    return foundObj;
};