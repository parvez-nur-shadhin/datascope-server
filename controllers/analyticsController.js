import Record from '../models/record.js';

export const getAnalytics = async (req, res) => {
  try {
    const [totalRecords, recordsByCategory, recordsByStatus] = await Promise.all([
      // 1. Total Records Count
      Record.countDocuments(),
      
      // 2. Aggregate by Category
      Record.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      
      // 3. Aggregate by Status
      Record.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalRecords,
        recordsByCategory: recordsByCategory.map(item => ({ name: item._id, value: item.count })),
        recordsByStatus: recordsByStatus.map(item => ({ name: item._id, value: item.count }))
      }
    });
  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ success: false, message: 'Server Error loading analytics.' });
  }
};