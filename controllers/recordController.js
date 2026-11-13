import Record from '../models/record.js';

export const getRecords = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      status, 
      country, 
      minRevenue, 
      maxRevenue,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { datasetName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) query.status = status;
    if (country) query.country = country;
    
    if (minRevenue || maxRevenue) {
      query.revenue = {};
      if (minRevenue) query.revenue.$gte = Number(minRevenue);
      if (maxRevenue) query.revenue.$lte = Number(maxRevenue);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sortConfig = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const records = await Record.find(query)
      .sort(sortConfig)
      .skip(skip)
      .limit(Number(limit))
      .lean(); 

    const total = await Record.countDocuments(query);

    res.status(200).json({
      success: true,
      data: records,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};