const mongoose = require('mongoose');
const { strLengthValidator } = require('./validators');

const tagValidator = {
  validator: function (v) {
    return v.every((tag) => tag.length <= 10);
  },
  message: (props) => {
    const longTags = props.value.filter((tag) => tag.length > 10);
    return `The tags: [${longTags}] exceeds the maximum length of 10 characters!`;
  },
};

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please enter the <title> attribute'],
      validate: (title) =>
        strLengthValidator(title, 'title', { min: 5, max: 20 }),
      index: true,
    },
    status: {
      type: String,
      default: 'to-do',
      set: (v) => v.toLowerCase(),
      enum: {
        values: ['to-do', 'done', 'in progress'],
        message:
          '<{VALUE}> is not a supported status, choose one from [to-do, in progress, done]',
      },
    },
    tags: {
      type: [String],
      validate: tagValidator,
    },
  },
  { timestamps: true }
);

const Todo = new mongoose.model('Todo', todoSchema);
module.exports = Todo;
