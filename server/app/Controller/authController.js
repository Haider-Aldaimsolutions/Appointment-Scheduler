const User = require("../Model/Users");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
var nodemailer = require("nodemailer");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hdrali036@gmail.com",
    pass: "Haiderali_036",
  },
});

module.exports.signup = async (req, res) => {
  const { firstName, lastName, email, country, password } = req.body;
  try {
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      country: country,
      password: password,
      verifiedStatus: 0,
    });
    res.status(201).send({ user });

    var mailOptions = {
      from: "hdrali036@gmail.com",
      to: "bcsf19m528@pucit.edu.pk",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isValid = await user.comparePassword(password);
      console.log(isValid, "isValid");
      if (isValid) {
        const token = await user.generateJWT();
        res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        res.status(201).send({ user_id: user.id, token });
      } else {
        res.status(400).send({ error: "Incorrect Password" });
      }
    } else {
      res.status(400).send({ error: "Username does not exit" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.sendVerifyToken = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = await user.generateJWT();

      const url = `http://localhost:8080/api/verify/${token}`;
      const msg = {
        to: email, // Change to your recipient
        from: process.env.SINGLE_SENDER_EMAIL, // Change to your verified sender
        subject: "Verify Account",
        html: `Click <a href = '${url}'>here</a> to confirm your email.`,
      };
      sgMail
        .send(msg)
        .then(() => {
          res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
          return res.status(201).send({
            user_token: token,
            message: `Sent a verification email to ${email}`,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      res.status(400).send({ error: "Email does not exit" });
    }
  } catch (err) {
    console.log(err.message);
  }
};
