import * as utils from './utils.js';
import { userName, userAvatar } from './main.js';
import { UserComment } from "./Comment.js";

export default class Form {
    constructor(context, isStatic = false) {
        this.context = context;
        this.isStatic = isStatic;
        this.id = this.isStatic ? 'form' : 'reply-form'
        this.create();
        this.init();
    }

    delete() {
        this.formElement.classList.add('form--delete')
        setTimeout(() => this.formElement.remove(), 500)
    }

    init() {
        this.formElement = document.querySelector(`#${this.id}`);
        this.formTextarea = this.formElement.querySelector('.form__textarea')
        this.formSubmitBtn = this.formElement.querySelector('.form__submit')
        this.formDeleteBtn = this.formElement.querySelector('.form__delete')
        this.formSubmitBtn.addEventListener('click', (event) => {
            this.addUserComment()
            event.preventDefault()
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
            author: userName,
            createdAt: 'Today',
            content: this.formTextarea.value,
            avatar: userAvatar,
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
        form.className = `form  ${this.isStatic ? '' : 'form--reply form--create'}`
        form.id = this.id
        form.innerHTML = this.generateFormTemplate()
        setTimeout(() => this.formElement.classList.remove('form--create'), 500)

        return form;
    }

    generateFormTemplate() {
        return `
            <img class="form__avatar" src="./images/avatars/image-juliusomo.png" alt="my avatar" aria-hidden="true">
            <label class="form__label" for="comment-text">
                Create a new comment
            </label>
            <textarea class="form__textarea" name="comment-text" id="comment-text" placeholder="Add a comment..."></textarea>
            <button type="button" class="form__submit">send</button>
            ${this.isStatic ? '' : '<button type="button" class="form__delete"><b>X</b></button>'}
        `;
    }
}