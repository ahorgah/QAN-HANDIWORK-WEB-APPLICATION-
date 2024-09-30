import { FoodItem, cartItem } from "../../../types";
import { _SEND_MAIL, __prepareEmails, emptyCart } from "../../utils/functions";

import { BiLock } from "react-icons/bi";
import CardForm from "./forms/Card";
import CheckoutFooter from "./footer";
import { ImSpinner3 } from "react-icons/im";
import MomoForm from "./forms/Momo";
import Selector from "./Selector";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState } from "react";
import { useStateValue } from "../../context/StateProvider";

const Body = ({ action }: { action: any }) => {
  const [{ checkoutData, cartTotal, paymentMethod, cartItems, foodItems }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const items = cartItems.map((item: cartItem) => {
    const foodItem = foodItems.find((foodItem: FoodItem) => foodItem.id === item.fid);
    return {
      ...item,
      ...foodItem,
    };
  });
  const completePayment = async () => {
    if (paymentMethod === "online" && !checkoutData) return toast.error("Complete request info");
    setLoading(true);

    // Prepare emails
    const { adminEmails, expertMessages, userEmail, messages } = __prepareEmails(items, checkoutData.email, checkoutData);

    try {
      // Send emails to admin
      await _SEND_MAIL(adminEmails, messages.admin);

      // Send emails to each expert with their specific message
      await Promise.all(expertMessages.map(({ email, message }) => _SEND_MAIL(email, message)));

      // Send confirmation email to user
      await _SEND_MAIL(userEmail, messages.user); // Corrected to pass userEmail as a string

      // Implement your empty cart logic
      await emptyCart(cartItems, foodItems, dispatch);

    } catch (error) {
      console.error("Email sending failed", error);
      toast.error("Failed to send email notifications.");
    } finally {
      // Success toast and loading state management
      toast.success("Your request has been sent successfully.");
      setLoading(false);
      action(false);
    }
  };



  return (
    <div className="w-full h-full rounded-t-[2rem]  bg-cartBg flex flex-col">
      {/* Payment Selectors */}
      <Selector />
      {/* payment form  */}
      <div className="min-h-[50vh] mt-5 overflow-y-auto mb-4">
        {paymentMethod === "online" ? <MomoForm /> : <CardForm />}
        <div className="w-full flex items-center justify-center my-2">
          <p className="text-gray-300">
            Amount Due:{" "}
            <span className="font-bold text-white">{`GH₵${cartTotal}`}</span>{" "}
          </p>
        </div>
        {/* pay now button */}

        <div className="w-full flex items-center justify-center mt-4">
          <motion.button
            onClick={completePayment}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 w-[90%] p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 transition-all duration-75 ease-in-out text-gray-50 text-lg my-2 hover:shadow-lg"
          >
            {!loading && <BiLock className="" />}
            {!loading ? (
              paymentMethod === "online" ? "SEND REQUEST" : "PING EXPERT(S)"
            ) : (
              <ImSpinner3 className="animate animate-spin" />
            )}
          </motion.button>
        </div>
      </div>
      <CheckoutFooter />
    </div>
  );
};

export default Body;
