import { FoodItem, cartItem } from "../../../../types";

import React from "react";
import { useStateValue } from "../../../context/StateProvider";

const CardForm = () => {
  const [{ cartItems, foodItems }] = useStateValue();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const items = cartItems.map((item: cartItem) => {
    const foodItem = foodItems.find((foodItem: FoodItem) => foodItem.id === item.fid);
    return {
      ...item,
      ...foodItem,
    };
  });


  return (
    <div className="w-full p-1 px-2 rounded-lg flex flex-col overflow-y-auto">
      {items.map((item: FoodItem, index: number) => (
        <div key={index} className="w-full flex flex-col mb-2">
          <label className="font-bold text-sm mb-1 text-gray-100">
            {item.title}
          </label>
          <textarea
            value={`Expert: ${item.expert || 'N/A'}\nPhone: ${item.phone || 'N/A'}\nEmail: ${item.email || 'N/A'}`}
            className="w-full cursor-pointer min-h-24 text-sm resize-none px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
            readOnly
          />
          <button
            onClick={() => copyToClipboard(`Expert: ${item.expert || 'N/A'}\nPhone: ${item.phone || 'N/A'}\nEmail: ${item.email || 'N/A'}`)}
            className="mt-1 text-orange-500 underline"
          >
            Copy Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardForm;
