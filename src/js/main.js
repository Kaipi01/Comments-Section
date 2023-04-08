import * as utils from './utils.js';
import * as json from '../data.json' assert { type: 'json' };
import CommentsList from "./CommentsList.js";
import Form from './Form.js';
import Modal from "./Modal.js";

const data = utils.getDataJSON(json);
const userName = data.currentUser.username;
const userAvatar = data.currentUser.image.png;
const commentsSection = document.querySelector('#comments');
const addCommentSection = document.querySelector('#add-comment')
const comments = new CommentsList(userName, userAvatar)

const form = new Form(addCommentSection, true)

const modal = new Modal(commentsSection)

comments.generateComments(data.comments, commentsSection)

console.log(data)

export { userName, userAvatar }