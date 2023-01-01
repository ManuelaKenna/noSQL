const { Schema, model } = require("mongoose");
const reactionschema = require("./Reactions");

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 250,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionschema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
