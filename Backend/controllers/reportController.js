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