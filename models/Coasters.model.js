const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const coasterSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    description: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    length: {
      type: Number,
      required: true
    },
    inversions: {
      type: Number
    },
    imageUrl: {
      type: String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Coaster = model("Coaster", coasterSchema);

module.exports = Coaster;
