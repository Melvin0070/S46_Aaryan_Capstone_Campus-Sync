import Drop from "../models/dropSchema.js";

// Create a new file
export const createDrop = async (req, res) => {
    try {
        const { topic, uploadedBy } = req.body;

        const file = new Drop({
            topic,
            content: req.file.buffer,
            uploadedBy,
            contentType: req.file.mimetype,
        });
        await file.save();

        return res.status(201).json({ message: 'File uploaded and saved successfully.', file });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all files
export const getAllDrop = async (req, res) => {
    try {
        const files = await Drop.find({}, 'topic uploadedBy uploadedAt content contentType');
        const filesWithBase64 = files.map(file => ({
            ...file._doc,
            content: `data:${file.contentType};base64,${file.content.toString('base64')}`
        }));
        return res.status(200).json(filesWithBase64);
    } catch (error) {
        console.error('Error fetching files:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a file by ID (only if uploaded by the same user)
export const deleteDrop = async (req, res) => {
    try {
        const file = await Drop.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        if (file.uploadedBy !== req.body.uploadedBy) {
            return res.status(403).json({ message: 'You are not allowed to delete this file.' });
        }

        await Drop.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'File deleted successfully.' });
    } catch (error) {
        console.error('Error deleting file:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
