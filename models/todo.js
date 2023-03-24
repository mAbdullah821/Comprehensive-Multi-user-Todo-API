const mongoose = require('mongoose');
const { strLengthValidator } = require('./validators');

const tagValidator = {
  validator: function (tags) {
    const isValidTagArrayLength = tags.length <= 10;
    if (!isValidTagArrayLength) {
      const errMessage = `The tags array exceeded the allowed length of 10, got ${tags.length} tags`;
      throw new Error(errMessage);
    }

    const isValidTagLength = tags.every((tag) => tag.length <= 10);
    if (!isValidTagLength) {
      const longTags = tags.filter((tag) => tag.length > 10);
      const errMessage = `The tags: [${longTags}] exceeds the maximum length of 10 characters!`;
      throw new Error(errMessage);
    }

    return true;
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
      set: (arr) => arr.map((tag) => tag.toLowerCase()),
      validate: tagValidator,
    },
  },
  { timestamps: true }
);

todoSchema.statics.todoPaginationByTags = function ({
  userId,
  tags,
  skip,
  limit,
}) {
  return this.aggregate()
    .match({ userId })
    .project({
      title: 1,
      status: 1,
      tags: 1,
      matchedTags: { $setIntersection: ['$tags', tags] },
    })
    .addFields({
      matchedTagsCount: { $size: '$matchedTags' },
    })
    .match({ matchedTagsCount: { $gt: 0 } })
    .sort({ matchedTagsCount: -1 })
    .skip(skip)
    .limit(limit);
};
const Todo = new mongoose.model('Todo', todoSchema);
module.exports = Todo;
