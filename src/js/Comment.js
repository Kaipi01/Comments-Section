import * as utils from './utils.js';

export default class Comment {
    constructor(context, id, author, creationDate, content, avatar, votes) {
        this.context = context;
        this.id = id;
        this.author = author;
        this.creationDate = creationDate;
        this.content = content;
        this.avatar = avatar || '';
        this.votes = votes || 0;
        this.isVoted = false;
        this.create();
        this.commentElement = document.querySelector(`#comment${this.id}`);
        this.attachElements();
        this.setEventListeners()
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
        this.voteNumberElement = this.commentElement.querySelector('.vote-number')
        this.upVoteBtn = this.commentElement.querySelector('.upvote-btn')
        this.downVoteBtn = this.commentElement.querySelector('.downvote-btn')
    }

    setEventListeners() {
        this.upVoteBtn.addEventListener('click', () => this.upVote())
        this.downVoteBtn.addEventListener('click', () => this.downVote())
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
                        <h3>${this.author}</h3>
                        <time datetime="${this.creationDate}">
                            ${this.getCreationDateFormat()}
                        </time>
                        <button class="reply-btn">
                            <img src="./images/icon-reply.svg" alt="reply icon" >
                            Reply
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

    getCreationDateFormat() {
        return this.creationDate;
    }

    getID() {
        return this.id;
    }

    getAuthor() {
        return this.author;
    }

    getCreationDate() {
        return this.creationDate;
    }

    setCreationDate(creationDate) {
        this.creationDate = creationDate;
    }

    getContent() {
        return this.content;
    }

    setContent(content) {
        this.content = content;
    }

    getAvatar() {
        return this.avatar;
    }

    setVotes(votes) {
        this.votes = votes;
    }

    getVotes() {
        return this.votes;
    }
}