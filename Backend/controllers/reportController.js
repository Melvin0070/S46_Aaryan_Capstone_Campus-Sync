import Report from "../models/reportSchema.js";

// Get report details
export const getReportData = async (req, res) => {
    try {
        const ID = req.params.ID;
        const report = await Report.find({ ID:ID });

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        // If report is found, return the report data
        return res.status(200).json(report);

    } catch (error) {
        console.error("Error fetching report:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Create a new report entry
export const createReport = async (req, res) => {
    try {
        // Extract report data from request body
        const { ID, issue, proposal } = req.body;   
        
        // Create a new report and save to the database
        const newReport = new Report({ ID, issue, proposal, solution: '' });
        await newReport.save();

        // Return success message 
        return res.status(201).json({ message: "Report created successfully", newReport });

    } catch (error) {
        console.error("Error creating report:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Update the solution field and set status to closed
export const updateSolution = async (req, res) => {
    try {
        // Extract the report ID from the request parameters and the solution from the request body
        const _id = req.params.id;
        const { solution } = req.body;

        // Find the report by its ID and update the solution and status fields
        const updatedReport = await Report.findByIdAndUpdate(
            _id,
            { solution: solution, status: 'closed' },
            { new: true }
        );

        // If the report is not found, return a 404 Not Found response
        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        // Return the updated report
        return res.json(updatedReport);

    } catch (error) {
        console.error("Error updating solution:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};