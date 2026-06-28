import orderService from "../services/orderService.js";

const createCheckoutSession = async (req, res) => {
  const { products } = req.body;

  if (!products || !Array.isArray(products)) {
    return res.status(400).json("Products are required and must be an array.");
  }

  try {
    const session = await orderService.createCheckoutSession(products);
    res.json({ id: session.id ,url:session.url});
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const confirmPayment = async (req, res) => {
  const { session_id } = req.body;

  if (!session_id) {
    return res.status(400).json("Session ID is required.");
  }

  try {
    const order = await orderService.confirmPayment(session_id);
    res.json({ order });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getOrderByEmail = async(req,res) =>{
  const {email} = req.params;
  if(!email){
    return res.status(400).send({message:"Email is required"});
  }
  try {
    const orders = await orderService.getOrderByEmail(email);
    if(!orders || orders.length === 0){
      return res.status(404).send({message:"No orders found by email"})
    }
    return res.status(200).send({orders});
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const getOrderById = async (req,res) =>{
  const {id} = req.params;
  try {
    const order = await orderService.getOrderById(id);
    if(!order){
      return  res.status(404).send({ message: "No order found with this ID" });
    }
    return res.status(200).send({order});
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const getAllOrdersByAdmin = async (req,res) => {
  try {
    const orders = await orderService.getAllOrdersByAdmin();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found", orders: [] });
    }
    return res.status(200).json({orders});
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const updateOrderStatus = async(req,res) => {
 const {id} = req.params;
 const {status} = req.body;
 if(!status) {
  return res.status(400).send({message:"Status is required"});
 }
 try {
  const  updatedOrder = await orderService.updateOrderStatus(id,status);
  if(!updatedOrder){
          return res
            .status(404)
            .json({ message: "Failed to update order",});

  }
  return res.status(200).json({
    message:"Order status updated successfully",
    order:updatedOrder});
 } catch (error) {
      return res.status(500).send({message:"Failed to update the status"});

 }
}

const deleteOrder = async(req,res) => {
const {id} = req.params;
try {
  const deleteOrder = await orderService.deleteOrder(id);
 if (!deleteOrder) {
  return res.status(404).json({message:"Failed to delete the order"})
 }
 return res.status(200).json({message:"Order deleted successgfully",
  order:deleteOrder});
} catch (error) {
        return res.status(500).send({ message: "Failed to delete the order" });

}
}


export default {
  createCheckoutSession,
  confirmPayment,
  getOrderByEmail,
  getOrderById,
  getAllOrdersByAdmin,
  updateOrderStatus,
  deleteOrder,
};