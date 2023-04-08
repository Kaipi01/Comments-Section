import { UserComment, Comment } from "./Comment.js";

export default class CommentsList {
    constructor(userName, userAvatar) {
        this.userName = userName;
        this.userAvatar = userAvatar;
    }

    generateComments(data, context) {
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

            author === this.userName
                ? new UserComment(properties)
                : new Comment(properties);

            if (replies) {
                this.generateComments(
                    replies,
                    document.querySelector(`#comment${id} .comment__replies`)
                )
            }
        });
    }
}