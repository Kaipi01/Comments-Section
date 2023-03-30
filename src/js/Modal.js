export default class Modal {
    constructor(context, title, content) {
        this.context = context;
        this.title = title;
        this.content = content;
        this.create();
        this.modalElement = document.querySelector(`.modal`);
        this.init();
    }

    close() {
        this.modalElement.style.display = 'none';
    }

    open() {
        this.modalElement.style.display = 'block';
    }

    init() {
        this.modalBtns = this.modalElement.querySelectorAll('button')
        this.modalBtns.forEach(btn => btn.addEventListener('click', () => this.close()))
    }

    create() {
        const template = `
            <dialog class="modal">
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
            </dialog>
        `;
        this.context.innerHTML += template;
    }
}