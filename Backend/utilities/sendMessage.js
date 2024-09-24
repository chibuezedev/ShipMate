const sid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(sid, token);

const sendSMS = async (to) => {
  try {
    const message = await client.messages.create({
      body: "Thank you for placing an order with DelFe. Your order will be delivered soon!",
      to: `+234${to}`,
      from: "+23408071953000",
    });

    console.log(`Message sent successfully. SID: ${message.sid}`);
  } catch (err) {
    console.error(`Error sending message: ${err.message}`);
  }
};

module.exports = sendSMS;
