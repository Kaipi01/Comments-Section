import * as utils from '../utils.js';
import { USER_NAME, USER_AVATAR } from '../main.js';
import { UserComment } from "./Comment.js";

const FORM_ID = 'form',
    FORM_REPLY_ID = 'reply-form',
    FORM_CLASS = 'form',
    FORM_DELETE_MODIFIER_CLASS = 'form--delete',
    FORM_REPLY_MODIFIER_CLASS = 'form--reply',
    FORM_CREATE_MODIFIER_CLASS = 'form--create',
    FORM_TEXTAREA_CLASS = 'form__textarea',
    FORM_TEXTAREA_ID = 'comment-text',
    FORM_TEXTAREA_PLACEHOLDER = 'Add a comment...',
    FORM_DELETE_BUTTON_CLASS = 'form__delete',
    FORM_SUBMIT_CLASS = 'form__submit',
    FORM_IMG_CLASS = 'form__avatar',
    FORM_LABEL_CLASS = 'form__label'

export default class Form {
    constructor(context, isStatic = false) {
        this.context = context;
        this.isStatic = isStatic;
        this.id = this.isStatic ? FORM_ID : FORM_REPLY_ID
        this.create();
        this.init();
    }

    delete() {
        this.formElement.classList.add(FORM_DELETE_MODIFIER_CLASS)
        setTimeout(() => this.formElement.remove(), 500)
    }

    init() {
        this.formElement = document.querySelector(`#${this.id}`);
        this.formTextarea = this.formElement.querySelector(`.${FORM_TEXTAREA_CLASS}`)
        this.formSubmitBtn = this.formElement.querySelector(`.${FORM_SUBMIT_CLASS}`)
        this.formDeleteBtn = this.formElement.querySelector(`.${FORM_DELETE_BUTTON_CLASS}`)
        this.formSubmitBtn.addEventListener('click', e => {
            this.addUserComment()
            e.preventDefault()
        })
        if (!this.isStatic)
            this.formDeleteBtn.addEventListener('click', () => this.delete())
    }

    addUserComment() {
        if (this.formTextarea.value === '') return

        let replyToPerson
        const contextParent = this.context.parentNode
        const commentsSection = document.querySelector('#comments');

        if (contextParent.classList.contains('comment'))
            replyToPerson = contextParent.querySelector('.comment__author').textContent

        new UserComment({
            context: this.isStatic ? commentsSection : this.context,
            id: utils.generateID(),
            author: USER_NAME,
            createdAt: 'Today',
            content: this.formTextarea.value,
            avatar: USER_AVATAR,
            score: 0,
            replyingTo: replyToPerson
        });

        this.isStatic
            ? this.formTextarea.value = ''
            : this.formElement.remove()
    }

    create() {
        this.context.prepend(this.generateForm());
    }

    generateForm() {
        const form = document.createElement('form')
        form.className = `${FORM_CLASS}  ${this.isStatic ? '' : FORM_REPLY_MODIFIER_CLASS + ' ' + FORM_CREATE_MODIFIER_CLASS}`
        form.id = this.id
        form.innerHTML = this.generateFormTemplate()
        setTimeout(() => this.formElement.classList.remove(FORM_CREATE_MODIFIER_CLASS), 500)

        return form;
    }

    generateFormTemplate() {
        return `
            <img class="${FORM_IMG_CLASS}" src="${USER_AVATAR}" alt="" aria-hidden="true">
            <label class="${FORM_LABEL_CLASS}" for="${FORM_TEXTAREA_ID}">
                Create a new comment
            </label>
            <textarea class="${FORM_TEXTAREA_CLASS}" name="${FORM_TEXTAREA_ID}" id="${FORM_TEXTAREA_ID}" placeholder="${FORM_TEXTAREA_PLACEHOLDER}"></textarea>
            <button type="button" class="${FORM_SUBMIT_CLASS}">send</button>
            ${this.isStatic ? '' : `<button type="button" class="${FORM_DELETE_BUTTON_CLASS}"><b>X</b></button>`}
        `;
    }
}