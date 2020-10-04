const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
    // commenter 필드에는 User 스키마의 사용자 ObjectId가 들어감
    commenter: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', commentSchema);