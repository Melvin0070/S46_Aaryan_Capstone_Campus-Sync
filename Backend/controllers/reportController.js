import Report from "../models/reportSchema.js";

// Get report details
export const getReportData = async (req, res) => {
    try {
        const reportId = req.params.id;
        const report = await Report.findOne({ ID: reportId });

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
        const { ID, issue, proposal, status, solution } = req.body;

        // Check if report entry with the same ID already exists
        const existingReport = await Report.findOne({ ID });
        
        if (existingReport) {
            return res.status(400).json({ message: "Report with the same ID already exists" });
        }

        // Create a new report and save to the database
        const newReport = new Report({ ID, issue, proposal, status, solution });
        await newReport.save();

        // Return success message 
        return res.status(201).json({ message: "Report created successfully" });

    } catch (error) {
        console.error("Error creating report:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};