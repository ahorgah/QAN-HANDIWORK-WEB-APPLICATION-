import { FoodItem, FoodItems, cartItem } from "../../types";
import {
  firebaseAddToCart,
  firebaseDeleteCartItem,
  firebaseDeleteFood,
  firebaseEmptyUserCart,
  firebaseFetchAllCartItems,
  firebaseFetchFoodItems,
  firebaseGetAllUsers,
  firebaseGetUser,
  firebaseLogout,
  firebaseUpdateCartItem,
  firebaseUpdateUser,
} from "../Firebase";

import Axios from 'axios';
import { MdShoppingBasket } from "react-icons/md";
import { WHITELISTED_IDS } from "./admins";
import { faker } from '@faker-js/faker';
import { toast } from "react-toastify";

export const addToCart = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  user: any,
  fid: number,
  dispatch: any
) => {
  if (!user) {
    toast.error("Please login to add service to cart", {
      icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
      toastId: "unauthorizedAddToCart",
    });
  } else {
    if (cartItems.some((item: cartItem) => item["fid"] === fid)) {
      toast.error("Service already in cart", {
        icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
        toastId: "itemAlreadyInCart",
      });
    } else {
      const data: cartItem = {
        id: Date.now(),
        fid: fid,
        uid: user.uid,
        qty: 1,
      };
      dispatch({
        type: "SET_CARTITEMS",
        cartItems: [...cartItems, data],
      });
      calculateCartTotal(cartItems, foodItems, dispatch);
      await firebaseAddToCart(data);
    }
  }
};
export const dispatchtUserCartItems = (
  uid: string,
  items: cartItem[],
  dispatch: any
) => {
  const cartItems = items.filter((item: cartItem) => item.uid === uid);
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });

  return cartItems;
};

export const fetchUserCartData = async (user: any, dispatch: any) => {
  if (user) {
    await firebaseFetchAllCartItems()
      .then((data) => {
        const userCart = dispatchtUserCartItems(user.uid, data, dispatch);
        localStorage.setItem("cartItems", JSON.stringify(userCart));
      })
      .then(() => { })
      .catch((e) => {
        console.log(e);
      });
  } else {
    localStorage.setItem("cartItems", "undefined");
  }
};



export const fetchFoodData = async (dispatch: any) => {
  try {
    const data = await firebaseFetchFoodItems();

    // Append random ratings and expert data for items without it
    const foodItemsWithAdditionalData = data.map((item: any) => {
      // Generate random rating from 1 to 5 (including 0.5)
      const rating = Math.floor(Math.random() * 4) + 1 + (Math.random() < 0.5 ? 0.5 : 0);

      // Check if expert information exists, if not, generate it


      if (item.expert) return item

      return {
        ...item,
        rating,
        expert: faker.name.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
      };
    });

    // Dispatch the updated food items with additional data
    dispatch({
      type: "SET_FOOD_ITEMS",
      foodItems: foodItemsWithAdditionalData,
    });
  } catch (e) {
    console.log(e);
  }
};



export const getFoodyById = (menu: FoodItem[], fid: number) => {
  return menu.find((item: FoodItem) => item.id === fid);
};

//  Update cart item State
export const updateCartItemState = async (
  cartItems: cartItem[],
  item: cartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index] = item;
  }
  dispatch({
    type: "SET_CARTITEMS",
    cartItems: cartItems,
  });
  await firebaseUpdateCartItem(item)
    .then(() => { })
    .catch((e) => {
      console.log(e);
    });
};

// Update Cart Item Quantity
export const updateCartItemQty = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  item: cartItem,
  dispatch: any,
  val: number
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index].qty += val;
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
    await firebaseUpdateCartItem(cartItems[index])
      .then(() => { })
      .catch((e) => {
        console.log(e);
      });
  }
};

//  Delete Cart Item
export const deleteCartItem = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  item: cartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems.splice(index, 1);
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
    await firebaseDeleteCartItem(item)
      .then(() => { })
      .catch((e) => {
        console.log(e);
      });
  }
};

// Calculate Total Price Round to 2 decimal places
export const calculateCartTotal = (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  dispatch: any
) => {
  let total = 0;
  cartItems.forEach((item: cartItem) => {
    const foodItem = getFoodyById(foodItems, item.fid);
    total += item.qty * parseFloat(foodItem?.price || "0");
  });
  dispatch({
    type: "SET_CART_TOTAL",
    cartTotal: total.toFixed(2),
  });
};

// Empty Cart
export const emptyCart = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  dispatch: any
) => {
  if (cartItems.length > 0) {
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: [],
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
    await firebaseEmptyUserCart(cartItems)
      .then(() => { })
      .catch((e) => {
        console.log(e);
      });
  } else {
    toast.warn("Cart is already empty");
  }
};

// Hide Cart
export const hideCart = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CART",
    showCart: !true,
  });
};

// Hide Cart
export const hideContactform = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CONTACT_FORM",
    showContactForm: !true,
  });
};

export const shuffleItems = (items: any) => {
  let currentIndex = items.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [items[currentIndex], items[randomIndex]] = [
      items[randomIndex],
      items[currentIndex],
    ];
  }

  return items;
};

export const logout = async (user: any, dispatch: any, navigate: any) => {
  if (user) {
    await firebaseLogout()
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "SET_CARTITEMS",
          cartItems: [],
        });
        // turn off adminMode
        dispatch({
          type: "SET_ADMIN_MODE",
          adminMode: false,
        });

        localStorage.setItem("user", "undefined");
        localStorage.setItem("adminMode", "undefined");
        localStorage.removeItem("cartItems");
        navigate("/");
      })
      .catch((e: any) => {
        console.log(e);
      });
  } else {
    console.log("You are not logged in");
  }
};

export const ToggleAdminMode = (dispatch: any, state: boolean) => {
  dispatch({
    type: "SET_ADMIN_MODE",
    adminMode: state,
  });
  localStorage.setItem("adminMode", JSON.stringify(state));
  console.log(state);
};

export const isAdmin = (user: any) => {
  let isAdmin = WHITELISTED_IDS.includes(user?.email);
  return isAdmin;
};

// get user
export const getUserData = async (user: any) => {
  return await firebaseGetUser(user.uid);
};

// update currentUser
export const updateUserData = async (
  user: any,
  dispatch: any,
  alert: boolean
) => {
  await firebaseUpdateUser(user)
    .then(() => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    })
    .catch((e: any) => {
      console.log(e);
    })
    .then(() => {
      localStorage.setItem("user", JSON.stringify(user));
      alert && toast.success("User data updated successfully");
    });
};

// get all users
export const dispatchUsers = async (dispatch: any) => {
  await firebaseGetAllUsers()
    .then((users: any) => {
      dispatch({
        type: "SET_USERS",
        users: users,
      });
    })
    .catch((e: any) => {
      console.log(e);
    });
};
export const getAllUser = async () => {
  await firebaseGetAllUsers()
    .then((users: any) => {
      return users;
    })
    .catch((e: any) => {
      console.log(e);
    });
};
// delete food
export const deleteFood = async (
  food: FoodItem,
  foodItems: FoodItem[],
  dispatch: any
) => {
  await firebaseDeleteFood(food.id);
  // remove food from foodItems
  const foodIndex = foodItems.indexOf(food);
  if (foodIndex !== -1) {
    foodItems.splice(foodIndex, 1);
  }
  dispatch({
    type: "SET_FOOD_ITEMS",
    foodItems,
  });
  toast.success("Service deleted successfully");
};



// Base URL for the email service
const BASE_URL = "https://everythingmail.onrender.com/";

type MailData = {
  receiver_email: string[],
  sender_email?: string,
  sender_identity?: string,
  subject: string,
  message: string,
  noreply?: boolean,
};

// Function to send email
export const _SEND_MAIL = async (recipients: string | string[], message: string) => {
  // Prepare mail data
  const mailData: MailData = {
    receiver_email: Array.isArray(recipients) ? recipients : [recipients],
    sender_email: undefined, // Set if you have a specific sender email
    sender_identity: "HandiWork Services App",
    subject: "Service Request Confirmation", // Adjust the subject as needed
    message,
    noreply: true,
  };

  try {
    const { data } = await Axios({
      method: "POST",
      url: `${BASE_URL}api/send`, // Ensure you append the correct endpoint if needed
      data: mailData,
      headers: { "Content-Type": "application/json" },
    });

    if (data?.success) {
      toast.success("Email sent successfully");
    } else {
      toast.error("Sorry, something went wrong");
    }
  } catch (error: any) {
    let message =
      error?.response?.data?.message || error.code === "ERR_NETWORK"
        ? "Network Error"
        : "Sorry, something went wrong";
    toast.error(message);
    console.error(error);
  }
};


export const __prepareEmails = (
  cartItems: FoodItem[],
  userEmail: string,
  checkoutData?: { name: string; phone: string; email: string; comments: string }
) => {
  // Collect admin emails (Assuming you have a function to fetch them)
  const adminEmails = WHITELISTED_IDS;

  // Filter expert emails based on the cart items
  const expertEmails = Array.from(new Set(cartItems.map((item: FoodItem) => item.email))) as string[];

  const total = cartItems.reduce((acc: number, item: FoodItem) => acc + parseFloat(item.price), 0);

  // Prepare the common checkout details if available
  const checkoutDetails = checkoutData
    ? `\n\nCustomer Details: 
        Name: ${checkoutData.name}, 
        Phone: ${checkoutData.phone}, 
        Email: ${checkoutData.email}, 
        Comments: ${checkoutData.comments}`
    : '';

  // Prepare admin email content
  const adminMessage = `A new service request has been made. Services Requested: ${cartItems.map(item => item.title).join(", ")}, Total Expected Amount: GH₵${total}. 
  ${checkoutDetails}`;

  // Prepare expert email content
  const expertMessages = expertEmails.map(email => {
    const services = cartItems
      .filter(item => item.email === email)
      .map(item => item.title)
      .join(", ");

    return {
      email,
      message: `You have a new service request for your services: ${services}. Total Due: GH₵${total}. 
      ${checkoutDetails}`
    };
  });

  // Prepare user email content
  const userMessage = checkoutData
    ? `Thank you ${checkoutData.name} for your service request of GH₵${total}. We will process it shortly. 
    ${checkoutDetails}`
    : `Thank you for your service request of GH₵${total}. We will process it shortly.`;

  return {
    adminEmails,
    expertMessages,
    expertEmails,
    userEmail,
    userMessage,
    messages: {
      admin: adminMessage,
      user: userMessage,
    },
  };
};
