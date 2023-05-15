("use strict");
const stripe = require("stripe")(process.env.STRIPE_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const home = ctx.request.body;
    const {data:{price, description, title}, message}= home
    console.log(price, description, title );
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
        // images: [item.image], // optional
      };

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + "",
        cancel_url: process.env.CLIENT_URL + "/?success=false",
        line_items: [transfromedItem],
      });

      await strapi.service("api::order.order").create({
        data: {
          home: {
            title,
            price,
            description,
          },
          stripeId: session.id,
          message:message
        },
      });

      return { stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      return { error: "error", messaege: error };
    }
  },
}));
