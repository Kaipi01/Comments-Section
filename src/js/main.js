import * as utils from './utils.js';
import * as json from '../data.json' assert { type: 'json' };
import Comment from "./Comment.js";
import UserComment from "./UserComment.js";
import Modal from "./Modal.js";

const data = utils.getDataJSON(json);
const userName = data.currentUser.username;
const userAvatar = data.currentUser.image.png;


const submitBtn = document.querySelector('.add-comment__submit');
const comment1replies = document.querySelector('#comment1 .comment__replies')
const comment2replies = document.querySelector('#comment2 .comment__replies')
const commentsSection = document.querySelector('.comments');

const properties = {
  context: comment1replies,
  id: 5,
  author: 'Mati',
  creationDate: 'Today',
  content: 'siema sddsdfdsfdfsdsdsf',
  avatar: './images/avatars/image-juliusomo.png',
  votes: 24,
  replyingTo: 'amyrobson'
}

const properties2 = {
  context: commentsSection,
  id: 6,
  author: 'Mati',
  creationDate: 'Today',
  content: 'siema to jest przykadowy komentarz',
  avatar: './images/avatars/image-juliusomo.png',
  votes: 4,
}

const properties3 = {
  context: commentsSection,
  id: 7,
  author: 'Mati',
  creationDate: 'Today',
  content: 'siema sddsdfdsfdfsdsdsf',
  avatar: './images/avatars/image-juliusomo.png',
  votes: 54,
}

const comment2 = new Comment({
  context: commentsSection,
  id: 45,
  author: 'Mati',
  creationDate: 'Today',
  content: 'Lorem palorem 233hb3234324b4323b32b434j 324hkbjjjjjjjjjjjjjjjjjjjj3b 4243324kbj432bjk432kbj4kj432kjb2 kbjjb32jkb432kbj432kbj32',
  avatar: './images/avatars/image-juliusomo.png',
  votes: 1,
});


const userComment = new UserComment(properties);
const userComment2 = new UserComment(properties2);
const userComment4 = new UserComment({
  context: comment2replies,
  id: 15,
  author: 'Mati',
  creationDate: 'Today',
  content: 'siema sddsdfdsfdfsdsdsf',
  avatar: './images/avatars/image-juliusomo.png',
  votes: 94,
  replyingTo: 'amyrobson'
});

const userComment3 = new UserComment(properties3);

const comment = new Comment({
  context: commentsSection,
  id: 25,
  author: 'Mati',
  creationDate: 'Today',
  content: 'siema elo pomelo',
  avatar: './images/avatars/image-juliusomo.png',
  votes: 0,
});

const comment3 = new Comment({
  context: document.querySelector('#comment15 .comment__replies'),
  id: 125,
  author: 'Matiffdfds',
  creationDate: 'Today',
  content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi autem corrupti, culpa molestias odit assumenda alias in beatae aspernatur, ducimus provident. Recusandae dicta ea, ipsum debitis quae architecto molestiae perferendis? Vero earum perferendis molestiae nobis mollitia, fugiat consectetur excepturi labore sed unde dicta quos illo praesentium voluptas voluptate dolores nostrum dolore. Dolorum consequuntur consequatur quam delectus quisquam suscipit aspernatur inventore, facere nam, voluptates, error sint sapiente officia maxime similique. Nemo ab consequuntur doloremque temporibus quae quo, assumenda aperiam possimus iste molestias asperiores cumque sunt labore deleniti ipsam suscipit eius facere error incidunt praesentium. Cupiditate nisi doloribus laboriosam nesciunt dolorum obcaecati vero! Cumque accusamus assumenda modi suscipit? Voluptatum odio rerum quod! Beatae quod aspernatur harum saepe tenetur laboriosam nesciunt qui porro odio. Iusto eum vel rem officiis magni repellat illo saepe provident, obcaecati fugiat esse eligendi deleniti minus amet suscipit, quia in iste ab quam ipsum dignissimos laborum consectetur! Qui molestias nostrum minima cumque porro expedita eligendi non mollitia. Repellendus sed illum, iure ratione recusandae doloremque natus nobis nemo laboriosam perspiciatis eligendi exercitationem ea, adipisci suscipit et provident dolor culpa rerum vitae ut eaque. Deserunt cumque quaerat repudiandae eveniet voluptatem cum, in reiciendis quo vero incidunt quas. Ratione mollitia maxime alias!',
  avatar: './images/avatars/image-juliusomo.png',
  votes: 40,
  replyingTo: 'Mati'
});

const comment4 = new Comment({
  context: document.querySelector('#comment125 .comment__replies'),
  id: 225,
  author: 'Mati',
  creationDate: 'Today',
  content: 'oj byczku +1',
  avatar: './images/avatars/image-juliusomo.png',
  votes: 20,
});

const comment5 = new Comment({
  context: document.querySelector('#comment225 .comment__replies'),
  id: 215,
  author: 'Mati',
  creationDate: 'Today',
  content: 'oj byczku -1',
  avatar: './images/avatars/image-juliusomo.png',
  votes: 20,
});

const modal = new Modal(commentsSection)

modal.open()


submitBtn.addEventListener('click', (event) => {
  addUserComment();
  const newcomment = new UserComment(properties);
  event.preventDefault();
})

//console.log(data)


function generateComments(data) {

}

function addUserComment() {

}




