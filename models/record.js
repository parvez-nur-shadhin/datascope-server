import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  datasetName: { type: String, required: true, index: true },
  category: { type: String, index: true },
  status: { type: String, index: true },
  country: { type: String, index: true },
  revenue: { type: Number, index: true },
  description: { type: String },
}, { timestamps: true });

// Text index for global search
recordSchema.index({ datasetName: 'text', description: 'text', category: 'text' });

export default mongoose.model('Record', recordSchema);