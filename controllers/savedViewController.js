import SavedView from '../models/savedView.js';

export const getSavedViews = async (req, res) => {
  try {
    const views = await SavedView.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: views });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const createSavedView = async (req, res) => {
  try {
    const newView = await SavedView.create(req.body);
    res.status(201).json({ success: true, data: newView });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deleteSavedView = async (req, res) => {
  try {
    await SavedView.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'View deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};