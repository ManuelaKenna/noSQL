const { Schema, model } = require("mongoose");
const reactionschema = require("./Reactions");

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughttext: {
      type: String,
      required: true,
      max_length: 250,
    },
    createdat: {
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

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
