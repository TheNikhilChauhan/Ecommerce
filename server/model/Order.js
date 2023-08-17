const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: { type: [Schema.Types.Mixed], required: true },
  totalAmount: { type: Number },
  totalItems: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  paymentMethod: { type: String },
  status: { type: String, default: "pending" },
  selectedAddress: { type: Schema.Types.Mixed, required: true },
});

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtual: true,
  versionkey: false,
  transform: function (doc, res) {
    delete res._id;
  },
});

exports.Order = mongoose.model("Order", orderSchema);
