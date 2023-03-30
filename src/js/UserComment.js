import Comment from "./Comment.js";

export default class UserComment extends Comment {
    constructor({ context, id, author, creationDate, content, avatar, votes, replyingTo } = properties) {
        super(context, id, author, creationDate, content, avatar, votes, replyingTo);
    }

    edit() { }
    delete() {
        this.commentElement.remove();
    }

    attachElements() {
        this.editBtn = this.commentElement.querySelector('.comment__edit-btn')
        this.deleteBtn = this.commentElement.querySelector('.comment__delete-btn')
    }

    setEventListeners() {
        this.editBtn.addEventListener('click', () => this.edit())
        this.deleteBtn.addEventListener('click', () => this.delete())
    }

    create() {
        const template = `
            ${this.replyingTo ? '<li>' : ''}
                <article id="comment${this.id}" class="comment ${this.replyingTo ? 'comment--reply' : ''}">
                    <div class="comment__container">
                        <div class="comment__info">
                            <header class="comment__header">
                                ${this.generateAvatar()}
                                ${this.generateTitle()}
                                ${this.generateDateCreated()}
                                ${this.generateDeleteButton()}
                                ${this.generateEditButton()}
                            </header>
                            ${this.generateContent()}
                        </div>
                        ${this.generateCommentVotes()}
                    </div>
                    <ul class="comment__replies"></ul>
                </article>
            ${this.replyingTo ? '</li>' : ''}
        `;
        this.context.innerHTML += template;
    }

    generateTitle() {
        return `
            <h3 class="comment__author">
                ${this.author}
                <span class="comment__author-badge">you</span>
            </h3>
        `
    }

    generateDeleteButton() {
        return `
            <button class="comment__tool-btn comment__delete-btn">
                <img class="comment__delete-btn-icon" src="./images/icon-delete.svg" aria-hidden="true" alt="">
                Delete
            </button>
        `
    }

    generateEditButton() {
        return `
            <button class="comment__tool-btn comment__edit-btn">
                <img class="comment__edit-btn-icon" src="./images/icon-edit.svg" aria-hidden="true" alt="">
                Edit
            </button>
        `
    }

    upVote() {
        return;
    }

    downVote() {
        return;
    }
}