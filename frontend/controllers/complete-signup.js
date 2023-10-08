const axios = require("axios");
const { response } = require("express");
module.exports = async (req, res) => {
  //get data from db and update profile page
  const formData = req.body; // retrieve form data from request body
  // process form data...

  let username = req.body.username;
  let password = req.body.password;
  let name = req.body.name;

  axios
    .post("https://goldenhacks5-0-backend.onrender.com/api/auth", {
      action: "set",
      uid: username,
      pwd: password,
      name: name,
    })
    .then((response) => {
      console.log(response);
    });

  res.redirect("login");

  // const received_data = await Driver.find({ username: req.body.username }); //search driver by username
  // if (Object.keys(received_data).length !== 0) {
  //   res.redirect("/signup");
  // } else {
  //   Driver.create(req.body);
  //   res.redirect("/login");
  // }
};
