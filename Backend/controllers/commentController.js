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



// Update an existing comment entry
export const updateComment = async (req, res) => {
    try {
        // Extract comment ID from request parameters and extract updated comment data from request body
        const commentId = req.params.id;        
        const { commenter, comment, likes } = req.body;

        // Find the comment entry by ID and if comment entry does not exist, return 404 Not Found
        let foundComment = await Comment.findById(commentId);
        
        if (!foundComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Update comment data with new values and save the updated comment data and return success message
        foundComment.commenter = commenter || foundComment.commenter;
        foundComment.comment = comment || foundComment.comment;
        foundComment.likes = likes || foundComment.likes;
        
        await foundComment.save();
        
        return res.status(200).json({ message: "Comment updated successfully", comment: foundComment });

    } catch (error) {
        console.error("Error updating comment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Delete an existing comment entry
export const deleteComment = async (req, res) => {
    try {
        // Extract comment ID from request parameters
        const commentId = req.params.id;

        // Find the comment entry by ID and if the comment entry does not exist, return 404 Not Found
        const existingComment = await Comment.findById(commentId);
        
        if (!existingComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Delete the comment entry from the database and return success message
        await existingComment.deleteOne();
        
        return res.status(200).json({ message: "Comment deleted successfully" });

    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};