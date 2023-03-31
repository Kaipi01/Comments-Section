import * as utils from './utils.js';
import * as json from '../data.json' assert { type: 'json' };
import Comment from "./Comment.js";
import UserComment from "./UserComment.js";
import Form from './Form.js';
import Modal from "./Modal.js";

const data = utils.getDataJSON(json);
const userName = data.currentUser.username;
const userAvatar = data.currentUser.image.png;
const submitBtn = document.querySelector('.form__submit');
const commentsSection = document.querySelector('#comments');
const modal = new Modal(commentsSection)

let unusedNumberID = 5;
//modal.open()

submitBtn.addEventListener('click', (event) => {
  addUserComment(commentsSection);
  event.preventDefault();
})

console.log(data)
generateComments(data.comments, commentsSection)

new Form(
  document.querySelector('#comment3')
)

new Comment({
  context: commentsSection,
  id: 45,
  author: 'Mati',
  creationDate: 'Today',
  content: 'Lorem palorem',
  avatar: './images/avatars/image-juliusomo.png',
  votes: 1,
});

function addUserComment(commentContext, replyToPerson) {
  const textarea = document.querySelector('#form .form__textarea')

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

function generateComments(data, context) {
  data.forEach(comment => {
    const { id, content, createdAt, score, replies, replyingTo, user } = comment;
    const author = user.username;
    const avatar = user.image.png;
    const properties = {
      context,
      id,
      author,
      createdAt,
      content,
      avatar,
      score,
      replyingTo
    }

    author === userName
      ? new UserComment(properties)
      : new Comment(properties);

    if (replies) {
      generateComments(
        replies,
        document.querySelector(`#comment${id} .comment__replies`)
      )
    }
  });
}