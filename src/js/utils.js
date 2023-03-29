export function enableBtn(btn) {
    btn.removeAttribute('disabled');
    btn.classList.remove('clicked')
}

export function disableBtn(btn) {
    btn.setAttribute('disabled', true)
    btn.classList.add('clicked')
}