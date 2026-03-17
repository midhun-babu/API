import * as userService from "../services/userService.js";
import * as userQueries from "../dbqueries/userQueries.js";



export const registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userQueries.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found1111" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
   await userService.fetchAllUsers(req.body);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const editUser = async(req, res) =>{
  try{
    const users = await userService.editUser(req.params.id)
    if(!users) return res.status(404).json({error:"User Not found"});
  }catch(err){
    res.status(500).json({error:err.message});
  }
};

export const deleteUser = async(req,res)=>{
  try{
    const user = await userService.softDeleteUser(req.params.id)
    if(!user) return res.status(404).json({err:"User not found"})
  }catch(err){
    res.status(500).json({error:err.message})
  }

};