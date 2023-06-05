import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    address: [
      {
      _id: uuid(),
      name:"Leo Messi",
      street:"19/4 Rosario St",
      city:"Rosario",
      state:"Rosario",
      country:"Argentina",
      zipCode:"S2002",
      mobile:"87518964",
    },
    {
      _id: uuid(),
      name:"Paulo Dybala",
      street:"4th Florentino St",
      city:"Rome",
      state:"Rome",
      country:"Italy",
      zipCode:"IT002",
      mobile:"65485425",
    }
  ]
  },
];
