export function getDataJSON(json) {
    const stringFromJSON = JSON.stringify(json);
    const data = JSON.parse(stringFromJSON);
    return data.default;
}

export function enableBtn(btn) {
    btn.removeAttribute('disabled');
    btn.classList.remove('comment__btn-vote--clicked')
}

export function disableBtn(btn) {
    btn.setAttribute('disabled', true)
    btn.classList.add('comment__btn-vote--clicked')
}