import * as addressQueries from "../dbqueries/addressQueries.js";

export const addAddress = async (userId, addressData) => {
  const existing = await addressQueries.getAddressesByUserId(userId);

  const isDuplicate = existing.find(addr => 
    addr.addressLine1.toLowerCase() === addressData.addressLine1.toLowerCase() && 
    addr.postalCode === addressData.postalCode
  );

  if (isDuplicate) {
    return await addressQueries.updateAddress(isDuplicate._id, userId, addressData);
  }

  if (existing.length === 0) {
    addressData.isDefault = true;
  } else if (addressData.isDefault) {
    await addressQueries.unsetDefaults(userId);
  }

  return await addressQueries.createAddress({ ...addressData, userId });
};

export const setAsDefault = async (userId, addressId) => {
  await addressQueries.unsetDefaults(userId);
  return await addressQueries.updateAddress(addressId, userId, { isDefault: true });
};

export const getUserAddresses = async (userId) => await addressQueries.getAddressesByUserId(userId);

export const updateAddress = async (userId, addressId, updateData) => {
  if (updateData.isDefault === true) {
    await addressQueries.unsetDefaults(userId);
  }

  const updatedAddress = await addressQueries.updateAddressById(addressId, userId, updateData);
  
  if (!updatedAddress) {
    throw { statusCode: 404, message: "Address not found or unauthorized" };
  }

  return updatedAddress;
};