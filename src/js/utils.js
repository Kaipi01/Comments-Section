let unusedNumberID = 5;
const deleteEvent = new CustomEvent('custom:delete', {
    bubbles: true
})
const openModalEvent = new CustomEvent('custom:open-modal', {
    bubbles: true
})

export { deleteEvent, openModalEvent }

export function generateID() {
    return unusedNumberID++
}

export function getDataJSON(json) {
    const stringFromJSON = JSON.stringify(json)
    const data = JSON.parse(stringFromJSON)
    return data.default
}

export function getLocalStorageData(key) {
    const data = []
    let i = 1

    // while (localStorage.getItem(key + i)) {
    //     data.push(
    //         JSON.parse(localStorage.getItem(key + i))
    //     )
    //     i++
    // }
    return data
}

export function enableBtn(btn) {
    btn.removeAttribute('disabled');
    btn.classList.remove('comment__btn-vote--clicked')
}

export function disableBtn(btn) {
    btn.setAttribute('disabled', true)
    btn.classList.add('comment__btn-vote--clicked')
}

export function animate(element, animationClass, animationTime = 500) {
    element.classList.add(animationClass)
    setTimeout(() => element.classList.remove(animationClass), animationTime)
}

export function getFormatDate() {
    const date = new Date();
    const dateISOFormat = date.toISOString().slice(0,10)
    const dateMnemonicFormat = 'Today'
    
    return {dateISOFormat, dateMnemonicFormat}
}