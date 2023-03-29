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
            <article id="comment${this.id}" class="comment ${this.replyingTo ? 'comment--reply' : ''}" itemscope itemtype="https://schema.org/Comment">
                <div class="comment__container">
                    <div class="comment__info">
                        <header class="comment__header">
                            <img class="comment__avatar" src="${this.avatar}" alt="${this.author} avatar"
                                itemprop="image">
                            <h3 class="comment__author" itemprop="author">
                                ${this.author}
                                <span class="comment__author-badge">you</span>
                            </h3>
                            <time class="comment__created-at" datetime="2022-10-13" itemprop="dateCreated">
                                ${this.creationDate}
                            </time>
                            <button class="comment__tool-btn comment__delete-btn">
                                <img class="comment__delete-btn-icon" src="./images/icon-delete.svg" aria-hidden="true" alt="">
                                Delete
                            </button>
                            <button class="comment__tool-btn comment__edit-btn">
                                <img class="comment__edit-btn-icon" src="./images/icon-edit.svg" aria-hidden="true" alt="">
                                Edit
                            </button>
                        </header>
                        <p class="comment__content" itemprop="text">
                            ${this.replyingTo
                                ? '<a class="comment__link" href="#' + this.context.parentNode.id + '">@' + this.replyingTo + '</a>'
                                : ''
                            }
                            ${this.content}
                        </p>
                    </div>
                    <div class="comment__votes">
                        <p class="comment__score" itemprop="upvoteCount">${this.votes}</p>
                        <button class="comment__btn-vote comment__btn-vote-up">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="comment__btn-vote-icon">
                            <path
                            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z">
                            </path>
                        </svg>
                        <span class="comment__btn-vote-info">
                            Mark this comment as helpful
                        </span>
                        </button>
                        <button class="comment__btn-vote comment__btn-vote-down">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="comment__btn-vote-icon">
                                <path
                                d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z">
                                </path>
                            </svg>
                            <span class="comment__btn-vote-info">
                                Mark this comment as unhelpful
                            </span>
                        </button>
                    </div>
                </div>
                <ul class="comment__replies"></ul>
            </article>
        ${this.replyingTo ? '</li>' : ''}
        `;
        console.log(this.context)
        this.context.innerHTML += template;
    }

    upVote() {
        return;
    }

    downVote() {
        return;
    }
}