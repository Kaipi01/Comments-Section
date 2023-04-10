import * as utils from '../utils.js';

const MODAL_CLASS = 'modal',
    MODAL_ARTICLE_CLASS = 'modal__content',
    MODAL_H4_CLASS = 'modal__title',
    MODAL_BUTTON_CLASS = 'modal__btn',
    MODAL_CANCEL_BUTTON_CLASS = 'modal__btn-no',
    MODAL_DELETE_BUTTON_CLASS = 'modal__btn-yes',
    MODAL_PARAGRAPH_CLASS = 'modal__text'

export default class Modal {
    constructor(context) {
        this.context = context;
        this.create();
        this.init();
    }

    delete() {
        this.modalElement.remove();
    }

    open() {
        this.modalElement.style.display = 'block';
    }

    init() {
        this.modalElement = document.querySelector(`.${MODAL_CLASS}`);
        this.modalBtnNo = this.modalElement.querySelector(`.${MODAL_CANCEL_BUTTON_CLASS}`)
        this.modalBtnYes = this.modalElement.querySelector(`.${MODAL_DELETE_BUTTON_CLASS}`)
        this.modalBtnNo.addEventListener('click', () => this.delete())
        this.modalBtnYes.addEventListener('click', e => {
            e.target.dispatchEvent(utils.deleteEvent)
            this.delete()
        })
    }

    create() {
        this.context.append(this.generateModal());
    }

    generateModal() {
        const modal = document.createElement('dialog')
        modal.className = MODAL_CLASS
        modal.innerHTML = this.generateModalTemplate()

        return modal;
    }

    generateModalTemplate() {
        return `
            <article class="${MODAL_ARTICLE_CLASS}">
                <header>
                    <h4 class="${MODAL_H4_CLASS}">Delete comment</h4>
                </header>
                <p class="${MODAL_PARAGRAPH_CLASS}">
                    Are you really sure you want to delete this comment? This will remove the comment and can't be undone.
                </p>
                <button class="${MODAL_BUTTON_CLASS} ${MODAL_CANCEL_BUTTON_CLASS}">No, cancel</button>
                <button class="${MODAL_BUTTON_CLASS} ${MODAL_DELETE_BUTTON_CLASS}">Yes, delete</button>
            </article>
        `;
    }
}
