import Comment from "./Comment.js";
import UserComment from "./UserComment.js";
import Modal from "./Modal.js";

const commentsSection = document.querySelector('.comments');
const submitBtn = document.querySelector(".submit-btn");


submitBtn.addEventListener('click', (event) => {
  event.preventDefault()
})

const comment = new UserComment(commentsSection, 5, 'Mati', 'Today', "No siema co tam?", './images/avatars/image-juliusomo.png', 30);

console.log(comment.getVotes());

const modal = new Modal(
  commentsSection, 
  'Do you really want to delete this comment?'
);

modal.open()