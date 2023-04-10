import * as utils from './utils.js';
import * as json from '../data.json' assert { type: 'json' };
import CommentsList from "./Classes/CommentsList.js";
import Form from './Classes/Form.js';

const data = utils.getDataJSON(json);
const USER_NAME = data.currentUser.username;
const USER_AVATAR = data.currentUser.image.png;
const commentsSection = document.querySelector('#comments');
const addCommentSection = document.querySelector('#add-comment')
const comments = new CommentsList(USER_NAME, USER_AVATAR)

new Form(addCommentSection, true)

comments.generateComments(data.comments, commentsSection)

console.log(data)

export { USER_NAME, USER_AVATAR }