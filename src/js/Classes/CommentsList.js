import * as comment from "./Comment.js"

export default class CommentsList {
    constructor(userName, userAvatar) {
        this.userName = userName
        this.userAvatar = userAvatar
    }

    generateComments(data, context) {
        data.forEach(commentData => {
            const { id, content, createdAt, score, replies, replyingTo, user } = commentData
            const author = user.username
            const avatar = user.image.png
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

            author === this.userName
                ? new comment.UserComment(properties)
                : new comment.Comment(properties)

            if (replies) {
                this.generateComments(
                    replies,
                    document.querySelector(
                        `#${comment.ID_PREFIX + id} .${comment.REPLIES_LIST_CLASS}`
                    )
                )
            }
        })
    }
}