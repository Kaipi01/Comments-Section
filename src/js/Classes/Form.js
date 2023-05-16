import * as utils from '../utils.js'
import * as comment from "./Comment.js"
import { USER_NAME, USER_AVATAR } from '../main.js'

export const ID = 'form',
    REPLY_ID = 'reply-form',
    CLASS = 'form',
    DELETE_MODIFIER_CLASS = 'form--delete',
    REPLY_MODIFIER_CLASS = 'form--reply',
    CREATE_MODIFIER_CLASS = 'form--create',
    TEXTAREA_CLASS = 'form__textarea',
    TEXTAREA_ID = 'comment-text',
    TEXTAREA_PLACEHOLDER = 'Add a comment...',
    DELETE_BUTTON_CLASS = 'form__delete',
    SUBMIT_CLASS = 'form__submit',
    ERROR_CLASS = 'form__error',
    IMG_CLASS = 'form__avatar',
    LABEL_CLASS = 'form__label'

export class Form {
    constructor(context, isStatic = false) {
        this.context = context
        this.isStatic = isStatic
        this.id = this.isStatic ? ID : REPLY_ID
        this.create()
        this.init()
    }

    delete() {
        window.addEventListener('click', e => {
            if (e.target.className.slice(0, 4) !== CLASS) {
                utils.animate(this.formElement, DELETE_MODIFIER_CLASS)
                setTimeout(() => this.formElement.remove(), 500)
            }
        })
    }

    init() {
        this.formElement = document.querySelector(`#${this.id}`);
        this.formTextarea = this.formElement.querySelector(`.${TEXTAREA_CLASS}`)
        this.formSubmitBtn = this.formElement.querySelector(`.${SUBMIT_CLASS}`)
        this.formError = this.formElement.querySelector(`.${ERROR_CLASS}`)
        this.formDeleteBtn = this.formElement.querySelector(`.${DELETE_BUTTON_CLASS}`)
        this.formSubmitBtn.addEventListener('click', e => {
            this.addUserComment()
            e.preventDefault()
        })
        if (!this.isStatic)
            window.addEventListener('click', () => this.delete())
    }

    addUserComment() {
        this.formTextarea.addEventListener('input', () => this.formError.style.display = 'none')

        if (this.formTextarea.value === '') {
            this.formError.style.display = 'block'
            return
        }

        let replyToPerson
        const contextParent = this.context.parentNode
        const commentsSection = document.querySelector('#comments');
        this.formError.style.display = 'none'

        if (contextParent.classList.contains(comment.CLASS))
            replyToPerson = contextParent.querySelector(`.${comment.AUTHOR_CLASS}`).textContent

        const userComment = new comment.UserComment({
            context: this.isStatic ? commentsSection : this.context,
            id: utils.generateID(),
            author: USER_NAME,
            createdAt: 'Today',
            content: this.formTextarea.value,
            avatar: USER_AVATAR,
            score: 0,
            replyingTo: replyToPerson
        });

        utils.animate(userComment.commentElement, comment.ANIMATION_CLASS)

        this.isStatic
            ? this.formTextarea.value = ''
            : this.formElement.remove()
    }

    create() {
        this.context.prepend(this.generateForm())
    }

    generateForm() {
        const form = document.createElement('form')
        form.className = `${CLASS}  ${this.isStatic ? '' : REPLY_MODIFIER_CLASS + ' ' + CREATE_MODIFIER_CLASS}`
        form.id = this.id
        form.innerHTML = this.generateFormTemplate()
        setTimeout(() => this.formElement.classList.remove(CREATE_MODIFIER_CLASS), 500)

        return form
    }

    generateFormTemplate() {
        return `
            <img class="${IMG_CLASS}" src="${USER_AVATAR}" alt="" aria-hidden="true">
            <label class="${LABEL_CLASS}" for="${TEXTAREA_ID}">
                Create a new comment
            </label>
            <textarea class="${TEXTAREA_CLASS}" name="${TEXTAREA_ID}" id="${TEXTAREA_ID}" placeholder="${TEXTAREA_PLACEHOLDER}"></textarea>
            <p class="${ERROR_CLASS}">Comment cannot be empty!</p>
            <button type="button" class="${SUBMIT_CLASS}">send</button>
        `
    }
}