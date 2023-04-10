import * as utils from '../utils.js';

const CLASS = 'modal',
    ARTICLE_CLASS = 'modal__content',
    TITLE_CLASS = 'modal__title',
    BUTTON_CLASS = 'modal__btn',
    CANCEL_BUTTON_CLASS = 'modal__btn-no',
    DELETE_BUTTON_CLASS = 'modal__btn-yes',
    PARAGRAPH_CLASS = 'modal__text'

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
        this.modalElement = document.querySelector(`.${CLASS}`);
        this.modalBtnNo = this.modalElement.querySelector(`.${CANCEL_BUTTON_CLASS}`)
        this.modalBtnYes = this.modalElement.querySelector(`.${DELETE_BUTTON_CLASS}`)
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
        modal.className = CLASS
        modal.innerHTML = this.generateModalTemplate()

        return modal;
    }

    generateModalTemplate() {
        return `
            <article class="${ARTICLE_CLASS}">
                <header>
                    <h4 class="${TITLE_CLASS}">Delete comment</h4>
                </header>
                <p class="${PARAGRAPH_CLASS}">
                    Are you really sure you want to delete this comment? This will remove the comment and can't be undone.
                </p>
                <button class="${BUTTON_CLASS} ${CANCEL_BUTTON_CLASS}">No, cancel</button>
                <button class="${BUTTON_CLASS} ${DELETE_BUTTON_CLASS}">Yes, delete</button>
            </article>
        `;
    }
}
