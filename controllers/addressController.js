import * as addressService from "../services/addressService.js";

export const addAddress = async (req, res, next) => {
  try {
    const address = await addressService.addAddress(req.user.id, req.body);
    res.status(201).json(address);
  } catch (error) {
    next(error);
  }
};

export const getMyAddresses = async (req, res, next) => {
  try {
    const addresses = await addressService.getUserAddresses(req.user.id);
    res.status(200).json(addresses);
  } catch (error) {
    next(error);
  }
};

export const makeDefault = async (req, res, next) => {
  try {
    const updated = await addressService.setAsDefault(req.user.id, req.params.id);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};


export const updateMyAddress = async (req, res, next) => {
  try {
    const updated = await addressService.updateAddress(req.user.id, req.params.id, req.body);
    res.status(200).json({
      message: "Address updated successfully",
      address: updated
    });
  } catch (error) {
    next(error);
  }
};
