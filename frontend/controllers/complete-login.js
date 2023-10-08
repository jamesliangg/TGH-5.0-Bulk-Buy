const axios = require("axios");
const { response } = require("express");
const localStorage = require("localStorage");

module.exports = async (req, res) => {
  const formData = req.body; // retrieve form data from request body

  let username = req.body.username;
  let password = req.body.password;

  axios
    .post("https://goldenhacks5-0-backend.onrender.com/api/auth", {
      action: "get",
      uid: username,
      pwd: password,
    })
    .then((response) => {
      console.log(response.data.result);
      if (response.data.result != undefined) {
        res.redirect("/");
        doc = { uid: username, pwd: password, name: response.data.result };
        localStorage.setItem("storage", doc);
        req.session.user = doc;
        console.log(req.session.user);
      } else {
        res.redirect("/login");
      }
    });
  //console.log(response.status);
};
