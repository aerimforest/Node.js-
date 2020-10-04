const mongoose = require('mongoose');

const { Schema } = mongoose;

// 필드 정의
// 몽구스는 알아서 _id를 기본 키로 생성하므로 _id 필드는 생성할 필요 없음
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    married: {
        type: Boolean,
        required: true,
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// 스키마와 몽고디비 컬렉션 연결
module.exports = mongoose.model('User', userSchema);