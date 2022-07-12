const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");

const app = express();

app.use(cors());
app.use(json());

const { parsed: config } = dotenv.config();

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}`;

const auth = {
    username: config.API_KEY,
    password: config.API_SECRET
}

app.get("/photos", async (req, res) => {
  // console.log(req.query.next_cursor, 'req');
    const response = await axios.get(BASE_URL + "/resources/image", {
      auth,
      params: {
        next_cursor: req.query.next_cursor,
      },
    });
  res.send(response.data);
});

app.get('/search', async (req, res) => {
  const response = await axios.get(BASE_URL + '/resources/search', {
    auth,
    params: {
      expression: req.query.expression
    }
  })
  return res.send(response.data)
})

app.listen(7000, console.log(`Server is running`));