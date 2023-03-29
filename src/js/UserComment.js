import Comment from "./Comment.js";

export default class UserComment extends Comment {
    constructor(context, id, author, creationDate, content, avatar, votes) {
        super(context, id, author, creationDate, content, avatar, votes);
    }

    edit() {}
    delete() {
        this.commentElement.remove();
    }

    attachElements() {
        this.editBtn = this.commentElement.querySelector('.edit-btn')
        this.deleteBtn = this.commentElement.querySelector('.delete-btn')
    }

    setEventListeners() {
        this.editBtn.addEventListener('click', () => this.edit())
        this.deleteBtn.addEventListener('click', () => this.delete())
    }

    create() {
        const template = `
            <article id="comment${this.id}">
                <div class="comment-container">
                    <header>
                        <img
                            src="${this.avatar}"
                            alt="${this.author} avatar"
                        >
                        <h3>${this.author} <span class="badge">you</span></h3>
                        <time datetime="${this.creationDate}">
                            ${this.getCreationDateFormat()}
                        </time>
                        <button class="delete-btn">
                            <img src="./images/icon-delete.svg" alt="delete icon">
                            Delete
                        </button>
                        <button class="edit-btn">
                            <img src="./images/icon-edit.svg" alt="edit icon">
                            Edit
                        </button>
                    </header>
                    <p>${this.content}</p>
                </div>
                <div class="vote-buttons">
                    <button class="vote-btn upvote-btn">
                        <span>+</span>
                        <span class="visually-hidden">
                            Mark this comment as helpful
                        </span>
                    </button>
                    <p class="vote-number" aria-label="current votes">${this.votes}</p>
                    <button class="vote-btn downvote-btn">
                        <span></span>
                        <span class="visually-hidden">
                            Mark this comment as unhelpful
                        </span>
                    </button>
                </div>
            </article>
        `;
        this.context.innerHTML += template;
    }

    upVote() {
        return;
    }

    downVote() {
        return;
    }
}