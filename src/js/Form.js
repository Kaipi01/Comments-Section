import UserComment from "./UserComment.js";

export default class Form {
    constructor(context) {
        this.context = context;
        this.id = 'reply-form'
        this.create();
        this.init();
    }

    delete() {
        this.formElement.remove();
    }

    init() {
        this.formElement = document.querySelector(`#${this.id}`);
        this.formTextarea = this.formElement.querySelector('.form__textarea')
        this.formSubmitBtn = this.formElement.querySelector('.form__submit')
        this.formDeleteBtn = this.formElement.querySelector('.form__delete')
        this.formSubmitBtn.addEventListener('click', (event) => {
            this.addUserComment(commentContext, replyToPerson)
            event.preventDefault();
        })
        this.formDeleteBtn.addEventListener('click', () => this.delete())
    }

    addUserComment(commentContext, replyToPerson) {
        const textarea = document.querySelector('.add-comment__textarea')
      
        new UserComment({
          context: commentContext,
          id: unusedNumberID++,
          author: userName,
          createdAt: 'Today',
          content: textarea.value,
          avatar: userAvatar,
          score: 0,
          replyingTo: replyToPerson
        });
      
        textarea.value = ''
      }

    create() {
        this.context.append(this.generateForm());
    }

    generateForm() {
        const form = document.createElement('form')
        form.className = "form form--reply"
        form.id = this.id
        form.innerHTML = this.generateFormTemplate()

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
            <button type="button" class="form__delete"><b>X</b></button>
        `;
    }
}