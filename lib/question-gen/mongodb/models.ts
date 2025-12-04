import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
    index: true,
  },
  question: {
    type: String,
    required: true,
  },
  modelAnswer: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

// Create compound index for efficient queries
QuizSchema.index({ categoryId: 1, createdAt: -1 });

// IMPORTANT: Use mongoose.models to prevent model recompilation errors
export const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);
