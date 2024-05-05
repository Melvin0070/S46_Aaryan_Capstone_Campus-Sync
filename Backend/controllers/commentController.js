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



// Create a new comment entry
export const createComment = async (req, res) => {
    try {
        // Extract comment data from request body
        const { commenter, comment } = req.body;

        // Check if a comment entry with the same ID already exists
        const existingComment = await Comment.findOne({ commenter, comment });

        if (existingComment) {
            return res.status(400).json({ message: "Comment with the same commenter and comment already exists" });
        }

        // Create a new comment and save to the database
        const newComment = new Comment({ commenter, comment });        
        await newComment.save();

        // Return success message
        return res.status(201).json({ message: "Comment created successfully" });

    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};