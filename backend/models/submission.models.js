import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    code: { type: String, required: true },
    language: { type: String, required: true,enum: ['javascript', 'python', 'java', 'C++',] },
    status: { type: String, required: true, enum: ['pending', 'accepted', 'rejected','error'], default: 'pending' },
    submittedAt: { type: Date, default: Date.now },
    runtime: { type: Number,default:0 }, // in milliseconds
    memory: { type: Number,default:0 }, // in kilobytes
    errorMessage: { type: String, default: '' },
    testcasesPassed: { type: Number, default: 0 },
    totalTestcases: { type: Number, default: 0 },
}, { timestamps: true });

export const Submission= mongoose.model('Submission', submissionSchema);