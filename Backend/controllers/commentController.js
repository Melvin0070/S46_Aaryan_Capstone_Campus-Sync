import Comment from "../models/commentSchema.js";

// Get comment details
export const getCommentData = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // If comment is found, return the comment data
        return res.status(200).json(comment);

    } catch (error) {
        console.error("Error fetching comment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};