import * as utils from './utils.js'
import * as json from '../data.json' assert { type: 'json' }
import CommentsList from "./Classes/CommentsList.js"
import { Form } from './Classes/Form.js'
import Modal from './Classes/Modal.js'

const dataJSON = utils.getDataJSON(json),
    localStorageData = utils.getLocalStorageData('comment'),
    USER_NAME = dataJSON.currentUser.username,
    USER_AVATAR = dataJSON.currentUser.image.png,
    comments = new CommentsList(USER_NAME, USER_AVATAR),
    commentsSection = document.querySelector('#comments'),
    addCommentSection = document.querySelector('#add-comment'),
    commentsData = localStorageData.length > 0
        ? localStorageData
        : dataJSON.comments


new Modal(commentsSection)

new Form(addCommentSection, true)

comments.generateComments(
    commentsData,
    commentsSection
)

console.log(dataJSON.currentUser)
console.log(commentsData)

export { USER_NAME, USER_AVATAR, commentsData }