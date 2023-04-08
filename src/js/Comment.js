import * as utils from './utils.js';
import Form from './Form.js';
import Modal from './Modal.js';

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
        console.log(this.id)
        const formsReplay = document.querySelectorAll('.form--reply');
        formsReplay.forEach(form => form.remove())
        //console.log(this.context.id)
        //new Form(document.querySelector(`#${this.context.id} .comment__replies`))
        new Form(document.querySelector(`#comment${this.id} .comment__replies`))
    }

    upVote() {
        this.voteNumberElement.textContent = this.isVoted
            ? this.score += 2
            : ++this.score;
        this.isVoted = true;
        utils.animate(
            this.upVoteBtn,
            'comment__btn-vote--animate'
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
            'comment__btn-vote--animate'
        )
        utils.disableBtn(this.downVoteBtn)
        utils.enableBtn(this.upVoteBtn)
    }

    attachElements() {
        this.commentElement = document.querySelector(`#comment${this.id}`)
        this.voteNumberElement = this.commentElement.querySelector(`.comment__score`)
        this.upVoteBtn = this.commentElement.querySelector(`.comment__btn-vote-up`)
        this.downVoteBtn = this.commentElement.querySelector(`.comment__btn-vote-down`)
        this.replayBtn = this.commentElement.querySelector('.comment__reply-btn')
    }

    setEventListeners() {
        this.upVoteBtn.addEventListener('click', () => this.upVote())
        this.downVoteBtn.addEventListener('click', () => this.downVote())
        this.replayBtn.addEventListener('click', () => this.replayTo())
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
                        ${this.generateTitleWidthBadge(false)}
                        ${this.generateDateCreated()}
                        ${this.generateReplayButton()}
                    </header>
                    <p class="comment__content">
                        ${this.generateContent(this.content)}
                    </p>
                </div>
                ${this.generateCommentVotes()}
            </div>
            <ul class="comment__replies"></ul>
        `;
    }

    generateAvatar() {
        return `<img class="comment__avatar" src="${this.avatar}" alt="${this.author} avatar">`
    }

    generateTitleWidthBadge(isUser) {
        return `
            <h3 class="comment__author">${this.author}${isUser ? '<span class="comment__author-badge">you</span>' : ''}</h3>
        `
    }

    generateDateCreated() {
        return `
            <time class="comment__created-at" datetime="2022-10-13">
                ${this.createdAt}
            </time>
        `
    }

    generateContent(content) {
        const id = this.context.parentNode.id
        return `
            ${this.replyingTo
                ? '<a class="comment__link" href="#' + id + '">@' + this.replyingTo + '</a>'
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
        //
        modal.init()
        modal.open()
        console.log(modal.isAnswerYes())
        if (modal.isAnswerYes()) {
            this.commentElement.classList.add('comment--delete')
            setTimeout(() => this.commentElement.remove(), 500)
        }
        
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
            <div class="comment__container">
                <div class="comment__info">
                        <header class="comment__header">
                            ${this.generateAvatar()}
                            ${this.generateTitleWidthBadge(true)}
                            ${this.generateDateCreated()}
                            ${this.generateDeleteButton()}
                            ${this.generateEditButton()}
                        </header>
                        <p class="comment__content">
                            ${this.generateContent(this.content)} 
                        </p>
                        ${this.generateUpdateForm()}
                    </div>
                    ${this.generateCommentVotes()}
                </div>
            <ul class="comment__replies"></ul>
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
}