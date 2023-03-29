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
                <header>
                    <h4>Delete comment</h4>
                </header>
                <p>
                    Are you really sure you want to delete this comment? This will remove the comment and can't be undone.
                </p>
                <button>No, cancel</button>
                <button>Yes, delete</button>
            </dialog>
        `;
        this.context.innerHTML += template;
    }
}