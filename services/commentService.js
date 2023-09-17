const {
    createComment,
    createCommentReply,
    updateComment,
    getItemComments,
    getComment,
    deleteComment,
    upVoteComment,
    downVoteComment
} = require("../repository/index");

class CommentService {
    static async createComment(payload) {
        try {
            return await createComment(payload);
        } catch (error) {
            console.log({ error });
            throw error;
        }
    }

    static async upvoteAComment(payload) {
        try {
            const { commentId, userId } = payload;
            return await upVoteComment(commentId, userId)
        } catch (e) {
            console.log({ e })
            throw e
        }
    }

    static async downvoteAComment(payload) {
        try {
            const { commentId, userId } = payload;
            return await downVoteComment(commentId, userId)
        } catch (e) {
            console.log({ e })
            throw e
        }
    }

    static async createCommentReply(payload) {
        try {
            return await createCommentReply(payload);
        } catch (error) {
            console.log({ error });
            throw error;
        }
    }

    static async updateComment(filter, payload) {
        try {
            return await updateComment(filter, payload);
        } catch (error) {
            console.log({ error });
            throw error;
        }
    }

    static async getComments(page, filter) {
        try {
            return await getItemComments(page, filter);
        } catch (error) {
            throw error;
        }
    }

    static async getComment(filter) {
        try {
            return await getComment(filter);
        } catch (error) {
            throw error;
        }
    }

    static async deleteComment(id) {
        try {
            return await deleteComment(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CommentService;
