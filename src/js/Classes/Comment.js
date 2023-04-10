import * as utils from '../utils.js';
import Form from './Form.js';
import Modal from './Modal.js';

const COMMENT_ID = 'comment',
    COMMENT_CLASS = 'comment',
    COMMENT_CONTAINER_CLASS = 'comment__container',
    COMMENT_INFO_CLASS = 'comment__info',
    COMMENT_CONTENT_CLASS = 'comment__content',
    COMMENT_AVATAR_CLASS = 'comment__avatar',
    COMMENT_AUTHOR_CLASS = 'comment__author',
    COMMENT_AUTHOR_INFO_CLASS = 'comment__author-badge',
    COMMENT_HEADER_CLASS = 'comment__header',
    COMMENT_DATE_CLASS = 'comment__created-at',
    COMMENT_LINK_CLASS = 'comment__link',
    COMMENT_SCORE_CLASS = 'comment__score',    
    COMMENT_REPLIES_LIST_CLASS = 'comment__replies',
    COMMENT_TOOL_BTN_CLASS = 'comment__tool-btn',
    COMMENT_REPLY_BTN_CLASS = 'comment__reply-btn',
    COMMENT_REPLY_ICON = './images/icon-reply.svg',
    COMMENT_REPLY_ICON_CLASS = 'comment__reply-btn-icon',
    COMMENT_EDIT_BTN_CLASS = 'comment__edit-btn',
    COMMENT_EDIT_ICON = './images/icon-edit.svg',
    COMMENT_EDIT_ICON_CLASS = 'comment__edit-btn-icon',
    COMMENT_DELETE_BTN_CLASS = 'comment__delete-btn',
    COMMENT_DELETE_ICON = './images/icon-delete.svg',
    COMMENT_DELETE_ICON_CLASS = 'comment__delete-btn-icon',
    COMMENT_VOTES_CLASS = 'comment__votes',
    COMMENT_VOTE_BTN_CLASS = 'comment__btn-vote',
    COMMENT_VOTE_ICON_CLASS = 'comment__btn-vote-icon',
    COMMENT_UP_VOTE_BTN_CLASS = 'comment__btn-vote-up',
    COMMENT_DOWN_VOTE_BTN_CLASS = 'comment__btn-vote-down',
    COMMENT_VOTE_BTN_ANIMATION_CLASS = 'comment__btn-vote--animate',
    COMMENT_UP_VOTE_ICON = `
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="${COMMENT_VOTE_ICON_CLASS}">
            <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"></path>
        </svg>
    `,
    COMMENT_DOWN_VOTE_ICON = `
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="${COMMENT_VOTE_ICON_CLASS}">
            <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"></path>
        </svg>
    `


export class Comment {
    constructor({ context, id, author, createdAt, content, avatar = '', score = 0, replyingTo } = properties) {
        this.context = context;
        this.id = id;
        this.author = author;
        this.createdAt = createdAt;
        this.content = content;
        this.avatar = avatar;
        this.score = score;
        this.replyingTo = replyingTo;
        this.isVoted = false;
        this.create();
        this.attachElements();
        this.setEventListeners();
    }

    create() {
        this.context.append(this.generateComment());
    }

    replayTo(person) {
        const formsReplay = document.querySelectorAll('.form--reply');
        formsReplay.forEach(form => form.remove())

        new Form(document.querySelector(
            `#${COMMENT_ID + this.id} .${COMMENT_REPLIES_LIST_CLASS}`
        ))
    }

    upVote() {
        this.voteNumberElement.textContent = this.isVoted
            ? this.score += 2
            : ++this.score;
        this.isVoted = true;
        utils.animate(
            this.upVoteBtn,
            COMMENT_VOTE_BTN_ANIMATION_CLASS
        )
        utils.disableBtn(this.upVoteBtn)
        utils.enableBtn(this.downVoteBtn)
    }

    downVote() {
        this.voteNumberElement.textContent = this.isVoted
            ? this.score -= 2
            : --this.score;
        this.isVoted = true;
        utils.animate(
            this.downVoteBtn,
            COMMENT_VOTE_BTN_ANIMATION_CLASS
        )
        utils.disableBtn(this.downVoteBtn)
        utils.enableBtn(this.upVoteBtn)
    }

    attachElements() {
        this.commentElement = document.querySelector(`#${COMMENT_ID + this.id}`)
        this.voteNumberElement = this.commentElement.querySelector(`.${COMMENT_SCORE_CLASS}`)
        this.upVoteBtn = this.commentElement.querySelector(`.${COMMENT_UP_VOTE_BTN_CLASS}`)
        this.downVoteBtn = this.commentElement.querySelector(`.${COMMENT_DOWN_VOTE_BTN_CLASS}`)
        this.replayBtn = this.commentElement.querySelector(`.${COMMENT_REPLY_BTN_CLASS}`)
    }

    setEventListeners() {
        this.upVoteBtn.addEventListener('click', () => this.upVote())
        this.downVoteBtn.addEventListener('click', () => this.downVote())
        this.replayBtn.addEventListener('click', () => this.replayTo())
    }

    generateComment() {
        const comment = document.createElement('article')
        comment.className = `${COMMENT_CLASS} ${this.replyingTo ? 'comment--reply' : ''}`
        comment.id = COMMENT_ID + this.id
        comment.innerHTML = this.generateCommentTemplate();

        return comment;
    }

    generateCommentTemplate() {
        return `
            <div class="${COMMENT_CONTAINER_CLASS}">
                <div class="${COMMENT_INFO_CLASS}">
                    <header class="${COMMENT_HEADER_CLASS}">
                        ${this.generateAvatar()}
                        ${this.generateTitleWidthBadge(false)}
                        ${this.generateDateCreated()}
                        ${this.generateReplayButton()}
                    </header>
                    <p class="${COMMENT_CONTENT_CLASS}">
                        ${this.generateContent(this.content)}
                    </p>
                </div>
                ${this.generateCommentVotes()}
            </div>
            <ul class="${COMMENT_REPLIES_LIST_CLASS}"></ul>
        `;
    }

    generateAvatar() {
        return `<img class="${COMMENT_AVATAR_CLASS}" src="${this.avatar}" alt="${this.author} avatar">`
    }

    generateTitleWidthBadge(isUser) {
        const badge = `<span class="${COMMENT_AUTHOR_INFO_CLASS}">you</span>`

        return `
            <h3 class="${COMMENT_AUTHOR_CLASS}">${this.author}${isUser ? badge : ''}</h3>
        `
    }

    generateDateCreated() {
        return `
            <time class="${COMMENT_DATE_CLASS}" datetime="2022-10-13">
                ${this.createdAt}
            </time>
        `
    }

    generateContent(content) {
        const addresseeID = this.context.parentNode.id

        return `
            ${this.replyingTo
                ? `<a class="${COMMENT_LINK_CLASS}" href="#${addresseeID}">@${this.replyingTo}</a>`
                : ''}
            <span>${content}</span>
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
                <p class="comment__score">${this.score}</p>
                <button class="comment__btn-vote comment__btn-vote-up">
                    ${COMMENT_UP_VOTE_ICON}
                    <span class="comment__btn-vote-info">
                        Mark this comment as helpful
                    </span>
                </button>
                <button class="comment__btn-vote comment__btn-vote-down">
                    
                    ${COMMENT_DOWN_VOTE_ICON}
                    <span class="comment__btn-vote-info">
                        Mark this comment as unhelpful
                    </span>
                </button>
            </div>
        `
    }
}

export class UserComment extends Comment {
    constructor(properties) {
        super(properties)
    }

    // hideElement(element, isHidden) {
    //     isHidden 
    //     ? element.classList.toggle('comment__content--hide')
    //     : element.classList.toggle('comment__content--hide')

    // }

    edit() {
        const currentContent = this.commentContent.querySelector('span').textContent

        // this.commentContent.style.display = "none"
        // this.commentUpdateForm.style.display = "flex"   
        this.commentContent.classList.add('comment__content--hide')
        this.commentUpdateForm.classList.add('comment__update-form--show')
        this.commentUpdateTextarea.value = currentContent

        this.commentUpdateBtn.addEventListener('click', () => {
            const updateText = this.commentUpdateTextarea.value

            if (updateText !== '') {
                this.commentContent.innerHTML = this.generateContent(updateText)
                // this.commentUpdateForm.style.display = "none"
                // this.commentContent.style.display = "block"
                this.commentContent.classList.remove('comment__content--hide')
                this.commentUpdateForm.classList.remove('comment__update-form--show')
            }
        })
        this.editBtn.addEventListener('click', () => {
            if (this.commentUpdateForm.classList.contains('comment__update-form--show')) {
                this.commentContent.innerHTML = this.generateContent(currentContent)
                this.commentContent.classList.remove('comment__content--hide')
                this.commentUpdateForm.classList.remove('comment__update-form--show')
                // this.commentUpdateForm.style.display = "none"
                // this.commentContent.style.display = "block"
            }
        })

        // const contentSpan = this.commentContent.querySelector('span')
        // const currentContent = contentSpan.textContent

        // this.commentContent.innerHTML = `

        // `
        // const updateBtn = this.commentContent.querySelector('button')
        // const textarea = this.commentContent.querySelector('textarea')

        // textarea.value = currentContent

        // updateBtn.addEventListener('click', () => {
        //     if (textarea.value !== '') {
        //         this.commentContent.innerHTML = this.generateContent(textarea.value)
        //     }
        // })

        // this.editBtn.addEventListener('click', () => {
        //     if (!currentContent)
        //         this.commentContent.innerHTML = this.generateContent(currentContent)
        // })

        // window.addEventListener('click', (e) =>{ 
        //     // if (
        //     //     e.target.className !== 'comment__edit-btn-icon' &&
        //     //     e.target.className !== 'comment__edit-btn'
        //     //     ) {
        //     //     this.commentContent.innerHTML = this.generateContent(currentContent)
        //     // }
        //    console.log(e.target.className)
        //     //this.commentContent.innerHTML = this.generateContent(currentContent)
        // })

    }

    delete() {
        const modal = new Modal(this.context)
        modal.open()

        document.addEventListener('custom:delete', () => {
            this.commentElement.classList.add('comment--delete')
            setTimeout(() => this.commentElement.remove(), 500)
        })
    }

    attachElements() {
        this.commentElement = document.querySelector(`#comment${this.id}`)
        this.commentContent = this.commentElement.querySelector('.comment__content')
        this.editBtn = this.commentElement.querySelector('.comment__edit-btn')
        this.deleteBtn = this.commentElement.querySelector('.comment__delete-btn')
        this.voteBtns = this.commentElement.querySelectorAll('.comment__btn-vote')
        this.commentUpdateForm = this.commentElement.querySelector('.comment__update-form')
        this.commentUpdateBtn = this.commentElement.querySelector('.comment__update-btn')
        this.commentUpdateTextarea = this.commentElement.querySelector('.comment__update-textarea')
        this.voteBtns.forEach(btn => btn.setAttribute('disabled', true))
        //this.commentUpdateForm.style.display = "none"
    }

    setEventListeners() {
        this.editBtn.addEventListener('click', () => this.edit())
        this.deleteBtn.addEventListener('click', () => this.delete())
    }

    generateCommentTemplate() {
        return `
            <div class="${COMMENT_CONTAINER_CLASS}">
                <div class="${COMMENT_INFO_CLASS}">
                        <header class="${COMMENT_HEADER_CLASS}">
                            ${this.generateAvatar()}
                            ${this.generateTitleWidthBadge(true)}
                            ${this.generateDateCreated()}
                            ${this.generateDeleteButton()}
                            ${this.generateEditButton()}
                        </header>
                        <p class="${COMMENT_CONTENT_CLASS}">
                            ${this.generateContent(this.content)} 
                        </p>
                        ${this.generateUpdateForm()}
                    </div>
                    ${this.generateCommentVotes()}
                </div>
            <ul class="${COMMENT_REPLIES_LIST_CLASS}"></ul>
        `;
    }

    generateUpdateForm() {
        return `
            <form class="comment__update-form">
                <label class="form__label" for="update-text">
                    Update comment
                </label>
                <textarea class="form__textarea comment__update-textarea" name="update-text" id="update-text"></textarea>
                <button type="button" class="form__submit comment__update-btn">update</button>
            </form>
        `
    }

    generateDeleteButton() {
        return `
            <button class="${COMMENT_TOOL_BTN_CLASS} ${COMMENT_DELETE_BTN_CLASS}">
                <img class="${COMMENT_DELETE_ICON_CLASS}" src="${COMMENT_DELETE_ICON}" aria-hidden="true" alt="">
                Delete
            </button>
        `
    }

    generateEditButton() {
        return `
            <button class="${COMMENT_TOOL_BTN_CLASS} ${COMMENT_EDIT_BTN_CLASS}">
                <img class="${COMMENT_EDIT_ICON_CLASS}" src="${COMMENT_EDIT_ICON}" aria-hidden="true" alt="">
                Edit
            </button>
        `
    }
}