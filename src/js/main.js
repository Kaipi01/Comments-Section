import Comment from "./Comment.js";
import UserComment from "./UserComment.js";
import Modal from "./Modal.js";

const comment2 = document.querySelector('#comment2')
const context = comment2.querySelector('.comment__replies')
const commentsSection = document.querySelector('.comments');
const submitBtn = document.querySelector('button[type="submit"');
const modal = new Modal(commentsSection);

const properties = {
  context: context, 
  id: 5, 
  author: 'Mati', 
  creationDate: 'Today', 
  content: 'siema', 
  avatar: './images/avatars/image-juliusomo.png', 
  votes: 24, 
  replyingTo: 'amyrobson'
}

const properties2 = {
  context: commentsSection, 
  id: 6, 
  author: 'Mati', 
  creationDate: 'Today', 
  content: 'Elo działa?', 
  avatar: './images/avatars/image-juliusomo.png', 
  votes: 30, 
}
const properties3 = {
  context: commentsSection, 
  id: 7, 
  author: 'Mati', 
  creationDate: 'Today', 
  content: 'No siema co tam?', 
  avatar: './images/avatars/image-juliusomo.png', 
  votes: 20, 
}

const newcomment = new Comment(properties);
const newcomment2 = new Comment(properties2);
const newcomment3 = new Comment(properties3);

newcomment.init()
newcomment2.init()
newcomment3.init()


const newusercomment = new UserComment({
  context: commentsSection, 
  id: 8, 
  author: 'Mati', 
  creationDate: 'Today', 
  content: 'No siema to ja jestem prawdziwy', 
  avatar: './images/avatars/image-juliusomo.png', 
  votes: 0, 
});
newusercomment.init()


submitBtn.addEventListener('click', (event) => {
  event.preventDefault()
})

modal.open()