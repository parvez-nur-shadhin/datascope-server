import mongoose from 'mongoose';

const savedViewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dataset: { type: String, default: 'Enterprise Records' },
  filters: {
    search: { type: String, default: '' },
    status: { type: String, default: '' },
    country: { type: String, default: '' },
    minRevenue: { type: String, default: '' }
  },
  sorting: {
    sortBy: { type: String, default: 'createdAt' },
    sortOrder: { type: String, default: 'desc' }
  }
}, { timestamps: true });

export default mongoose.model('SavedView', savedViewSchema);