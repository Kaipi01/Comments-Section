export default class Modal {
    constructor(context, content) {
        this.context = context;
        this.content = content;
        this.create();
        this.modalElement = document.querySelector(`.modal`);
        this.initialize();
    }

    close() {
        this.modalElement.style.display = 'none';
    }

    open() {
        this.modalElement.style.display = 'block';
    }

    initialize() {
        this.modalBtns = this.modalElement.querySelectorAll('button')
        this.modalBtns.forEach(btn => btn.addEventListener('click', () => this.close()))
    }

    create() {
        const template = `
            <dialog class="modal">
                <header>
                    <img src="" alt="!" aria-hidden="true">
                    <h4>Warning</h4>
                    <button>
                        <span class="visually-hidden">close modal</span>
                        <img src="" alt="x" aria-hidden="true">
                    </button>
                </header>
                <p>${this.content}</p>
                <button>Yes</button>
                <button>No</button>
            </dialog>
        `;
        this.context.innerHTML += template;
    }
}