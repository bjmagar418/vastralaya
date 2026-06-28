import stripePackage from "stripe";
import Order from "../models/Order.js"; // Adjust path to match your Order model location

const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (products) => {
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "NPR",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:5173/cancel`,
  });
};

const confirmPayment = async (sessionId) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntentId = session.payment_intent.id;
  let order = await Order.findOne({ orderId: paymentIntentId });

  const computedStatus =
    session.payment_intent.status === "succeeded" ? "pending" : "failed";

  if (!order) {
    const lineItems = session.line_items.data.map((item) => ({
      productId: item.price.product,
      quantity: item.quantity,
    }));
    const amount = session.amount_total / 100;

    order = new Order({
      orderId: paymentIntentId,
      products: lineItems,
      amount: amount,
      email: session.customer_details.email,
      status: computedStatus,
    });
  } else {
    order.status = computedStatus;
  }

  await order.save();
  return order;
};

const getOrderByEmail = async(email) => {
 return await Order.find({email:email});
}

const getOrderById = async(id) => {
  return await Order.findById(id);
}

const getAllOrdersByAdmin = async () => {
  return await Order.find().sort({createdAt:-1});
}
const updateOrderStatus = async(id,status) => {
   return await Order.findByIdAndUpdate(id,
  {
    status,
    updatedAt:new Date(),
  },{
new:true,
runValidators: true,
  }
  );
}

const deleteOrder = async(id) => {
  const deleteOrder = await Order.findByIdAndDelete(id);
}

export default {
  createCheckoutSession,
  confirmPayment,
  getOrderByEmail,
  getOrderById,
  getAllOrdersByAdmin,
  updateOrderStatus,
  deleteOrder
};
