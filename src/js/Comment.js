import * as utils from './utils.js';

export default class Comment {
    constructor({ context, id, author, creationDate, content, avatar = '', votes = 0, replyingTo } = properties) {
        this.context = context;
        this.id = id;
        this.author = author;
        this.creationDate = creationDate;
        this.content = content;
        this.avatar = avatar;
        this.votes = votes;
        this.replyingTo = replyingTo;
        this.isVoted = false;
        this.create();
        this.attachElements();
        this.setEventListeners();
    }

    create() {
        this.context.append(this.generateComment());
    }

    upVote() {
        this.voteNumberElement.textContent = this.isVoted
            ? this.votes += 2
            : ++this.votes;
        this.isVoted = true;
        utils.disableBtn(this.upVoteBtn)
        utils.enableBtn(this.downVoteBtn)
    }

    downVote() {
        this.voteNumberElement.textContent = this.isVoted
            ? this.votes -= 2
            : --this.votes;
        this.isVoted = true;
        utils.disableBtn(this.downVoteBtn)
        utils.enableBtn(this.upVoteBtn)
    }

    attachElements() {
        this.commentElement = document.querySelector(`#comment${this.id}`)
        this.voteNumberElement = this.commentElement.querySelector(`.comment__score`)
        this.upVoteBtn = this.commentElement.querySelector(`.comment__btn-vote-up`)
        this.downVoteBtn = this.commentElement.querySelector(`.comment__btn-vote-down`)
    }

    setEventListeners() {
        this.upVoteBtn.addEventListener('click', () => this.upVote())
        this.downVoteBtn.addEventListener('click', () => this.downVote())
    }

    generateComment() {
        const comment = document.createElement('article')
        comment.className = `comment ${this.replyingTo ? 'comment--reply' : ''}`
        comment.id = `comment${this.id}`
        comment.innerHTML = this.generateCommentTemplate();

        return comment;
    }

    generateCommentTemplate() {
        return `
            <div class="comment__container">
                <div class="comment__info">
                    <header class="comment__header">
                        ${this.generateAvatar()}
                        ${this.generateTitle()}
                        ${this.generateDateCreated()}
                        ${this.generateReplayButton()}
                    </header>
                    ${this.generateContent()}
                </div>
                ${this.generateCommentVotes()}
            </div>
            <ul class="comment__replies"></ul>
        `;
    }

    generateAvatar() {
        return `<img class="comment__avatar" src="${this.avatar}" alt="${this.author} avatar">`
    }

    generateTitle() {
        return `
            <h3 class="comment__author">
                ${this.author}
            </h3>
        `
    }

    generateDateCreated() {
        return `
            <time class="comment__created-at" datetime="2022-10-13">
                ${this.creationDate}
            </time>
        `
    }

    generateContent() {
        const id = this.context.parentNode.id
        return `
            <p class="comment__content">
                ${this.replyingTo
                ? '<a class="comment__link" href="#' + id + '">@' + this.replyingTo + '</a>'
                : ''}
                ${this.content}
            </p>
        `
    }

    generateReplayButton() {
        return `
            <button class="comment__tool-btn comment__reply-btn">
                <img class="comment__reply-btn-icon" src="./images/icon-reply.svg" aria-hidden="true" alt="">
                Reply
            </button>
        `
    }

    generateCommentVotes() {
        return `
            <div class="comment__votes">
                <p class="comment__score">${this.votes}</p>
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
        `
    }
}