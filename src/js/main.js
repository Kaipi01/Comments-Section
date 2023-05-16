import * as utils from './utils.js'
import * as json from '../data.json' assert { type: 'json' }
import CommentsList from "./Classes/CommentsList.js"
import { Form } from './Classes/Form.js'
import Modal from './Classes/Modal.js'

const dataJSON = utils.getDataJSON(json),
    USER_NAME = dataJSON.currentUser.username,
    USER_AVATAR = dataJSON.currentUser.image.png,
    commentsSection = document.querySelector('#comments'),
    addCommentSection = document.querySelector('#add-comment'),
    commentsData = JSON.parse(localStorage.getItem('comments'))
        ?? dataJSON.comments


new Modal(commentsSection)
new Form(addCommentSection, true)
new CommentsList(USER_NAME, USER_AVATAR)
    .generateComments(
        commentsData,
        commentsSection
    )

console.log("User data: ", dataJSON.currentUser)
console.log("Comments data: ", commentsData)

export { USER_NAME, USER_AVATAR, commentsData }