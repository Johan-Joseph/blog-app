const mongoose = require("mongoose");
//Write missing code here
mongoose
  .connect(
   
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
