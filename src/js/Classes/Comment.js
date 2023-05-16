import * as utils from '../utils.js'
import * as form from './Form.js'

export const ID_PREFIX = 'comment',
    CLASS = 'comment',
    ANIMATION_CLASS = 'comment--animate',
    CONTAINER_CLASS = 'comment__container',
    INFO_CLASS = 'comment__info',
    CONTENT_CLASS = 'comment__content',
    AVATAR_CLASS = 'comment__avatar',
    AUTHOR_CLASS = 'comment__author',
    AUTHOR_INFO_CLASS = 'comment__author-badge',
    HEADER_CLASS = 'comment__header',
    DATE_CLASS = 'comment__created-at',
    LINK_CLASS = 'comment__link',
    SCORE_CLASS = 'comment__score',
    REPLIES_LIST_CLASS = 'comment__replies',
    UPDATE_FORM_CLASS = 'comment__update-form',
    UPDATE_TEXTAREA_CLASS = 'comment__update-textarea',
    UPDATE_TEXTAREA_ID = 'update-text',
    UPDATE_SUBMIT_CLASS = 'comment__update-btn',
    UPDATE_ERROR_CLASS = 'comment__update-error',
    TOOL_BTN_CLASS = 'comment__tool-btn',
    REPLY_BTN_CLASS = 'comment__reply-btn',
    REPLY_ICON = './images/icon-reply.svg',
    REPLY_ICON_CLASS = 'comment__reply-btn-icon',
    REPLY_MODIFIER_CLASS = 'comment--reply',
    DELETE_MODIFIER_CLASS = 'comment--delete',
    EDIT_BTN_CLASS = 'comment__edit-btn',
    EDIT_ICON = './images/icon-edit.svg',
    EDIT_ICON_CLASS = 'comment__edit-btn-icon',
    DELETE_BTN_CLASS = 'comment__delete-btn',
    DELETE_ICON = './images/icon-delete.svg',
    DELETE_ICON_CLASS = 'comment__delete-btn-icon',
    VOTES_CLASS = 'comment__votes',
    VOTE_BTN_INFO_CLASS = 'comment__btn-vote-info',
    VOTE_BTN_CLASS = 'comment__btn-vote',
    VOTE_ICON_CLASS = 'comment__btn-vote-icon',
    UP_VOTE_BTN_CLASS = 'comment__btn-vote-up',
    DOWN_VOTE_BTN_CLASS = 'comment__btn-vote-down',
    VOTE_BTN_ANIMATION_CLASS = 'comment__btn-vote--animate',
    VOTE_BTN_CLICKED_CLASS = 'comment__btn-vote--clicked',
    UP_VOTE_ICON = `
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="${VOTE_ICON_CLASS}">
            <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"></path>
        </svg>
    `,
    DOWN_VOTE_ICON = `
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="${VOTE_ICON_CLASS}">
            <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"></path>
        </svg>
    `


export class Comment {
    constructor({ context, id, author, createdAt, content, avatar = '', score = 0, replyingTo } = properties) {
        this.context = context;
        this.id = id
        this.author = author
        this.createdAt = createdAt
        this.content = content
        this.avatar = avatar
        this.score = score
        this.replyingTo = replyingTo
        this.replyingToID = parseInt(this.context.parentNode.id.substring(7)) || null
        this.isVoted = false
        this.votedTo = null
        this.create()
        this.attachElements()
        this.loadVotesFromLocalStorage()
        this.setEventListeners()
        this.saveToLocalStorage()
    }

    create() {
        this.context.append(this.generateComment())
    }

    replayTo() {
        const formsReplay = document.querySelectorAll(`.${form.REPLY_MODIFIER_CLASS}`)
        formsReplay.forEach(formReplay => formReplay.remove())

        new form.Form(document.querySelector(
            `#${ID_PREFIX + this.id} .${REPLIES_LIST_CLASS}`
        ))
    }

    vote(btn) {
        const isUpVoteBtn = btn === this.upVoteBtn
        const innerVoteBtn = isUpVoteBtn ? this.downVoteBtn : this.upVoteBtn

        this.voteNumberElement.textContent = this.isVoted
            ? (isUpVoteBtn ? --this.score : ++this.score)
            : (isUpVoteBtn ? ++this.score : --this.score)

        if (this.isVoted) {
            this.votedTo = null
            this.isVoted = false
            utils.enableBtn(innerVoteBtn)
            btn.classList.remove(VOTE_BTN_CLICKED_CLASS)
        } else {
            this.votedTo = isUpVoteBtn ? "up" : "down"
            this.isVoted = true
            utils.disableBtn(innerVoteBtn)
            btn.classList.add(VOTE_BTN_CLICKED_CLASS)
        }
        utils.animate(btn, VOTE_BTN_ANIMATION_CLASS)
        this.updateLocalStorage('score', this.score)
        this.updateLocalStorage('votedTo', this.votedTo)
    }

    attachElements() {
        this.commentElement = document.querySelector(`#${ID_PREFIX + this.id}`)
        this.voteNumberElement = this.commentElement.querySelector(`.${SCORE_CLASS}`)
        this.upVoteBtn = this.commentElement.querySelector(`.${UP_VOTE_BTN_CLASS}`)
        this.downVoteBtn = this.commentElement.querySelector(`.${DOWN_VOTE_BTN_CLASS}`)
        this.replayBtn = this.commentElement.querySelector(`.${REPLY_BTN_CLASS}`)
    }

    setEventListeners() {
        this.upVoteBtn.addEventListener('click', () => this.vote(this.upVoteBtn))
        this.downVoteBtn.addEventListener('click', () => this.vote(this.downVoteBtn))
        this.replayBtn.addEventListener('click', () => this.replayTo())
    }

    generateComment() {
        const comment = document.createElement('article')
        comment.className = `${CLASS} ${this.replyingTo ? REPLY_MODIFIER_CLASS : ''}`
        comment.id = ID_PREFIX + this.id
        comment.innerHTML = this.generateCommentTemplate()

        return comment
    }

    loadVotesFromLocalStorage() {
        const comments = JSON.parse(localStorage.getItem('comments'))
        const thisComment = utils.findNestedObjectByKey(comments, "id", this.id)

        if (thisComment?.votedTo) {
            this.isVoted = true

            if (thisComment.votedTo === "up") {
                utils.disableBtn(this.downVoteBtn)
                this.upVoteBtn.classList.add(VOTE_BTN_CLICKED_CLASS)
            } else {
                utils.disableBtn(this.upVoteBtn)
                this.downVoteBtn.classList.add(VOTE_BTN_CLICKED_CLASS)
            }
        }
    }

    updateLocalStorage(property, value) {
        const comments = JSON.parse(localStorage.getItem('comments'))
        const thisComment = utils.findNestedObjectByKey(comments, "id", this.id)
        thisComment[property] = value
        localStorage.setItem('comments', JSON.stringify(comments))
    }

    saveToLocalStorage() {
        setTimeout(() => {
            const comments = JSON.parse(localStorage.getItem('comments')) || []
            const thisComment = utils.findNestedObjectByKey(comments, "id", this.id)
            let context = comments

            if (thisComment) return

            const comment = {
                id: this.id,
                content: this.content,
                createdAt: this.createdAt,
                score: this.score,
                replyingTo: this.replyingTo,
                user: {
                    image: { png: this.avatar },
                    username: this.author,
                },
                replies: this.getRepliesComments(this.commentElement),
                votedTo: this.votedTo
            }

            if (this.replyingTo) {
                const addresseeComment = utils.findNestedObjectByKey(comments, "id", this.replyingToID)
                context = addresseeComment.replies
            }
            context.push(comment)
            localStorage.setItem('comments', JSON.stringify(comments))

        }, 500)
    }

    getRepliesComments(parentElement) {
        const repliesCommentsArray = []
        const repliesComments = parentElement.querySelectorAll(`.${REPLIES_LIST_CLASS} .${CLASS}`)

        repliesComments.forEach(comment => {
            const id = parseInt(comment.id.substring(7)),
                content = comment.querySelector(`.${CONTENT_CLASS} > span`).textContent,
                createdAt = comment.querySelector(`.${DATE_CLASS}`).textContent,
                score = parseInt(comment.querySelector(`.${SCORE_CLASS}`).textContent),
                replyingTo = comment.querySelector(`.${LINK_CLASS}`)?.textContent.substring(1),
                replies = this.getRepliesComments(comment),
                username = comment.querySelector(`.${AUTHOR_CLASS}`).childNodes[0].textContent,
                png = '.' + new URL(
                    comment.querySelector(`.${AVATAR_CLASS}`).src
                ).pathname.substring(4)

            repliesCommentsArray.push({
                id,
                content,
                createdAt,
                score,
                replyingTo,
                user: {
                    image: {
                        png,
                    },
                    username,
                },
                replies
            })
        })
        return repliesCommentsArray
    }

    generateCommentTemplate() {
        return `
            <div class="${CONTAINER_CLASS}">
                <div class="${INFO_CLASS}">
                    <header class="${HEADER_CLASS}">
                        ${this.generateAvatar()}
                        ${this.generateTitleWidthBadge(false)}
                        ${this.generateDateCreated()}
                        ${this.generateReplayButton()}
                    </header>
                    <p class="${CONTENT_CLASS}">
                        ${this.generateContent(this.content)}
                    </p>
                </div>
                ${this.generateCommentVotes()}
            </div>
            <div class="${REPLIES_LIST_CLASS}"></div>
        `
    }

    generateAvatar() {
        return `<img class="${AVATAR_CLASS}" src="${this.avatar}" alt="${this.author} avatar">`
    }

    generateTitleWidthBadge(isUser) {
        const badge = `<span class="${AUTHOR_INFO_CLASS}">you</span>`

        return `
            <h3 class="${AUTHOR_CLASS}">${this.author}${isUser ? badge : ''}</h3>
        `
    }

    generateDateCreated() {
        return `<time class="${DATE_CLASS}">${this.createdAt}</time>`
    }

    generateContent(content) {
        return `
            ${this.replyingTo
                ? `<a class="${LINK_CLASS}" href="#comment${this.replyingToID}">@${this.replyingTo}</a>`
                : ''}
            <span>${content}</span>
        `
    }

    generateReplayButton() {
        return `
            <button class="${TOOL_BTN_CLASS} ${REPLY_BTN_CLASS}">
                <img class="${REPLY_ICON_CLASS}" src="${REPLY_ICON}" aria-hidden="true" alt="">
                Reply
            </button>
        `
    }

    generateCommentVotes() {
        return `
            <div class="${VOTES_CLASS}">
                <p class="${SCORE_CLASS}">${this.score}</p>
                <button class="${VOTE_BTN_CLASS} ${UP_VOTE_BTN_CLASS}">
                    ${UP_VOTE_ICON}
                    <span class="${VOTE_BTN_INFO_CLASS}">
                        Mark this comment as helpful
                    </span>
                </button>
                <button class="${VOTE_BTN_CLASS} ${DOWN_VOTE_BTN_CLASS}">
                    ${DOWN_VOTE_ICON}
                    <span class="${VOTE_BTN_INFO_CLASS}">
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

    vote() { return }

    loadVotesFromLocalStorage() { return }

    edit() {
        const currentContent = this.commentContent.querySelector('span').textContent
        const openEdit = () => {
            this.commentUpdateError.style.display = 'none'
            this.commentContent.style.display = "none"
            this.commentUpdateForm.style.display = "flex"
        }
        const closeEdit = () => {
            this.commentUpdateForm.style.display = "none"
            this.commentContent.style.display = "block"
        }

        openEdit()
        this.commentUpdateTextarea.value = currentContent
        this.commentUpdateTextarea.addEventListener('input', () => this.commentUpdateError.style.display = 'none')
        this.commentUpdateSubmit.addEventListener('click', () => {
            const updateText = this.commentUpdateTextarea.value

            if (updateText !== '') {
                this.commentContent.innerHTML = this.generateContent(updateText)
                this.updateLocalStorage('content', updateText)
                closeEdit()
            } else {
                this.commentUpdateError.style.display = 'block'
            }
        })

        window.addEventListener('click', e => {
            if (
                e.target.id !== UPDATE_TEXTAREA_ID &&
                e.target !== this.editBtn &&
                e.target !== this.commentUpdateSubmit &&
                e.target.className !== EDIT_ICON_CLASS
            )
                closeEdit()
        })
    }

    delete() {
        document.dispatchEvent(utils.openModalEvent)
        document.addEventListener('custom:delete', () => {
            const filterByID = (a) => a.id !== this.id
            let comments = JSON.parse(localStorage.getItem('comments'))

            if (this.replyingTo) {
                const addresseeComment = utils.findNestedObjectByKey(comments, "id", this.replyingToID)
                addresseeComment.replies = addresseeComment.replies.filter(filterByID)
            }
            else comments = comments.filter(filterByID)

            localStorage.setItem('comments', JSON.stringify(comments))

            utils.animate(this.commentElement, DELETE_MODIFIER_CLASS)
            setTimeout(() => this.commentElement.remove(), 500)
        })
    }

    attachElements() {
        this.commentElement = document.querySelector(`#${ID_PREFIX + this.id}`)
        this.commentContent = this.commentElement.querySelector(`.${CONTENT_CLASS}`)
        this.editBtn = this.commentElement.querySelector(`.${EDIT_BTN_CLASS}`)
        this.deleteBtn = this.commentElement.querySelector(`.${DELETE_BTN_CLASS}`)
        this.voteBtns = this.commentElement.querySelectorAll(`.${VOTE_BTN_CLASS}`)
        this.commentUpdateForm = this.commentElement.querySelector(`.${UPDATE_FORM_CLASS}`)
        this.commentUpdateSubmit = this.commentElement.querySelector(`.${UPDATE_SUBMIT_CLASS}`)
        this.commentUpdateError = this.commentElement.querySelector(`.${UPDATE_ERROR_CLASS}`)
        this.commentUpdateTextarea = this.commentElement.querySelector(`.${UPDATE_TEXTAREA_CLASS}`)
        this.voteBtns.forEach(btn => btn.setAttribute('disabled', true))
    }

    setEventListeners() {
        this.editBtn.addEventListener('click', () => this.edit())
        this.deleteBtn.addEventListener('click', () => this.delete())
    }

    generateCommentTemplate() {
        return `
            <div class="${CONTAINER_CLASS}">
                <div class="${INFO_CLASS}">
                        <header class="${HEADER_CLASS}">
                            ${this.generateAvatar()}
                            ${this.generateTitleWidthBadge(true)}
                            ${this.generateDateCreated()}
                            ${this.generateDeleteButton()}
                            ${this.generateEditButton()}
                        </header>
                        <p class="${CONTENT_CLASS}">
                            ${this.generateContent(this.content)} 
                        </p>
                        ${this.generateUpdateForm()}
                    </div>
                    ${this.generateCommentVotes()}
                </div>
            <div class="${REPLIES_LIST_CLASS}"></div>
        `
    }

    generateUpdateForm() {
        return `
            <form class="${UPDATE_FORM_CLASS}">
                <label class="${form.LABEL_CLASS}" for="${UPDATE_TEXTAREA_ID}">
                    Update comment
                </label>
                <textarea class="${form.TEXTAREA_CLASS} ${UPDATE_TEXTAREA_CLASS}" name="${UPDATE_TEXTAREA_ID}" id="${UPDATE_TEXTAREA_ID}"></textarea>
                <p class="${form.ERROR_CLASS} ${UPDATE_ERROR_CLASS}">Comment cannot be empty!</p>
                <button type="button" class="${form.SUBMIT_CLASS} ${UPDATE_SUBMIT_CLASS}">update</button>
            </form>
        `
    }

    generateDeleteButton() {
        return `
            <button class="${TOOL_BTN_CLASS} ${DELETE_BTN_CLASS}">
                <img class="${DELETE_ICON_CLASS}" src="${DELETE_ICON}" aria-hidden="true" alt="">
                Delete
            </button>
        `
    }

    generateEditButton() {
        return `
            <button class="${TOOL_BTN_CLASS} ${EDIT_BTN_CLASS}">
                <img class="${EDIT_ICON_CLASS}" src="${EDIT_ICON}" aria-hidden="true" alt="">
                Edit
            </button>
        `
    }
}