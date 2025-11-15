import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true ,index:true},
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true,index:true },
    code: { type: String, required: true },
    language: { type: String, required: true,enum: ['javascript', 'python', 'java', 'c++',] },
    status: { type: String, required: true, enum: ['pending', 'accepted', 'rejected','error'], default: 'pending' },
    submittedAt: { type: Date, default: Date.now },
    runtime: { type: Number,default:0 }, // in milliseconds
    memory: { type: Number,default:0 }, // in kilobytes
    errorMessage: { type: String, default: '' },
    testcasesPassed: { type: Number, default: 0 },
    totalTestcases: { type: Number, default: 0 },
}, { timestamps: true });

submissionSchema.index({ userId: 1, problemId: 1 }); // Compound index for faster queries by userId and problemId

export const Submission= mongoose.model('Submission', submissionSchema);