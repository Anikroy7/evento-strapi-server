const stripe = require("stripe")("sk_test_51L1qwxD4PFFI7Raw4FVNW8znDOtp9R62kS4TpgL6vXPUYh6eKyfpfQh5G9LCKLA2BmnX2URFZZyOt20j3RPjBueG00UDdruAfs");

const handleStripePayment = async (paymentIntentId) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status === "succeeded") {
    // Handle successful payment
    console.log('success me');
  } else {
    console.log('failed me');
    // Handle failed payment
  }
};

export default handleStripePayment;
