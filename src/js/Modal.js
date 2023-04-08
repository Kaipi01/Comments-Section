export default class Modal {
    constructor(context) {
        this.context = context;
        this.flag = false;
        this.create();
        // this.init();
    }

    // close() {
    //     this.modalElement.style.display = 'none';
    // }

    delete() {
        this.modalElement.remove();
    }

    open() {
        this.modalElement.style.display = 'block';
    }

    isAnswerYes() {
        return this.flag;
    }

    init() {
        this.modalElement = document.querySelector('.modal');
        this.modalBtnNo = this.modalElement.querySelector('.modal__btn-no')
        this.modalBtnYes = this.modalElement.querySelector('.modal__btn-yes')
        this.modalBtnNo.addEventListener('click', () => this.delete())
        this.modalBtnYes.addEventListener('click', () => {
            this.flag = true;
            this.delete()
        })
    }

    create() {
        this.context.append(this.generateModal());
    }

    generateModal() {
        const modal = document.createElement('dialog')
        modal.className = "modal"
        modal.innerHTML = this.generateModalTemplate()

        return modal;
    }

    generateModalTemplate() {
        return `
            <article class="modal__content">
                <header>
                    <h4 class="modal__title">Delete comment</h4>
                </header>
                <p class="modal__text">
                    Are you really sure you want to delete this comment? This will remove the comment and can't be undone.
                </p>
                <button class="modal__btn modal__btn-no">No, cancel</button>
                <button class="modal__btn modal__btn-yes">Yes, delete</button>
            </article>
        `;
    }
}
