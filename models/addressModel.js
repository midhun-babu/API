import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  addressLine1:{String,required:true},
  addressLine2: String,
  city: String,
  state: String,
  postalCode: {String,required:true},
  isDefault: { type: Boolean, default: false },
});


const Address = mongoose.models.Address || mongoose.model(Address,addressSchema);

export default Address;
