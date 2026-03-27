import Lead from "../models/Lead.js"; 
export const createLead = async (req, res) => {
  try {
    const { name, email, status } = req.body;
    const newLead = await Lead.create({
      name,
      email,
      status,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, data: newLead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. Get All Leads (User specific)
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ userId: req.user.id });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Update Lead
export const updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedLead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 4. Delete Lead
export const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
