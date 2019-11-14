// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env' )});
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from "jsonwebtoken";

import { adjectives, nouns } from './words';

 export const generateSecret = () => {
   console.log("-----------generateSecret----------")
   const randomNumber = Math.floor(Math.random() * adjectives.length);
   return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
 };


 const sendMail = (email) => {
  console.log("-------------sendMail------------")
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
 }

 export const sendSecretMail = (address, secret) => {
  console.log("-----------sendSecretMail--------------")
  const email = {
    from: "coworksys@coworksys.com",
    to: address,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret is <strong> ${secret} </strong>.<br/>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET) 