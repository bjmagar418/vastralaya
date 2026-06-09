import userService from "../services/userService.js";

const createUser = async (req, res) =>{
    try{
   const userData = req.body;
    const user = await userService.createUser(userData);
    return res.json(user);
    }catch(error){
      res.status(500).send(error.message);
    }
 
}

const getAllUsers = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.getAllUsers(userData);
    return res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const {id} = req.params;

    const user = await userService.getUserById(id);
    return res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async(req,res) =>{
  const {id} = req.params;
  const data= req.body;

  try {
      const user = await userService.updateUser(id,data);
  return res.json(user);
  } catch (error) {
        res.status(500).send(error.message);

  }

}

const deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await userService.deleteUser(id);
    return res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default {createUser,getAllUsers,getUserById,updateUser,deleteUser};