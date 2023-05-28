("use strict");
const stripe = require("stripe")(process.env.STRIPE_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const {
      homeId,
      userId,
      message,
      home,
      arrivalDate,
      depratureDate,
      phoneNumber,
      totalPrice,
      totalGuests
    } = ctx.request.body;
    const {
      image: {
        data: { attributes: url },
      },
      price,
      title,
      description,
    } = home;

    try {
      const transfromedItem = {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: price * 100, // price in cents
          product_data: {
            name: title,
          },
        },
        description: description,
        // image: url, // optional
      };
      console.log(transfromedItem);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "http://localhost:5173/",
        cancel_url: "http://localhost:5173/" + "/?success=false",
        line_items: [transfromedItem],
      });

    const data=  await strapi.service("api::order.order").create({
        data: {
          homeId,
          userId,
          message,
          stripeId: session.id,
          arrivalDate,
          depratureDate,
          price: totalPrice,
          phone:phoneNumber,
          totalGuests
        },
      });
      return { stripeSession: session, data };
    } catch (error) {
      ctx.response.status = 500;
      return { error: "error", messaege: error };
    }
  },
}));
