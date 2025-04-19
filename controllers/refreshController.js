
const loadCSV = require("../services/readAndProcessCSV");

exports.refreshData = async (req, res) => {
  try {
    await loadCSV("sales_data.csv");
    res.json({ message: "Data refreshed" });
  } catch {
    res.status(500).json({ error: "Refresh failed" });
  }
};
