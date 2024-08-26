import React from "react";

const CardForm = () => {

  return (
    <div className="w-full p-1 px-2 rounded-lg flex flex-col">
      <div className="w-full flex flex-col mb-2">
        <label htmlFor="name" className="font-bold text-sm mb-1 text-gray-100">
          Provider's Name
        </label>
        <input
          type="text"
          id="name"
          value={"John Kumah"}
          className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
          placeholder="Enter your name"
          autoComplete="off"
          readOnly
          disabled
        />
      </div>
      <div className="w-full flex flex-col mb-2">
        <label
          htmlFor="number"
          className="font-bold text-sm mb-1 text-gray-100"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="number"
          value={1234567890}
          className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
          placeholder="Enter your number"
          autoComplete="off"
          readOnly
          disabled
        />
      </div>
      <div className="w-full flex flex-col mb-2">
        <label
          htmlFor="number"
          className="font-bold text-sm mb-1 text-gray-100"
        >
          Email
        </label>
        <input
          type="text"
          id="number"
          value={"sossoso@sdf.com"}
          className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
          placeholder=""
          autoComplete="off"
          readOnly
          disabled
        />
      </div>
      <div className="w-full flex flex-col mb-2">
        <label
          htmlFor="number"
          className="font-bold text-sm mb-1 text-gray-100"
        >
          Address
        </label>
        <textarea
          id="address"
          value={"Nasawam Akyi"}
          className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
          placeholder="Enter your number"
          autoComplete="off"
          readOnly
          disabled
        />
      </div>
    </div>
  );
};

export default CardForm;
