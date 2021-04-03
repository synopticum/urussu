const mongoose = require("mongoose");
const { prepare, commonMap } = require("./helpers");
const Schema = mongoose.Schema;

const PathSchema = new Schema(
  {
    id: { type: String, required: true },
    instanceType: { type: String, required: true },
    coordinates: { type: Array, required: true },

    title: { type: String, required: false },
    shortDescription: { type: String, required: false },
    fullDescription: { type: String, required: false },

    thumbnail: { type: String, required: false },
    images: { type: Object, required: false },
  },
  { id: false }
);

const PathModel = mongoose.model("Path", PathSchema, "paths");

module.exports = {
  PathModel,
  prepare: (raw) => prepare(raw, commonMap),
};
