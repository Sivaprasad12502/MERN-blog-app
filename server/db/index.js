//kEt4wl2eANwEHjTM

//mongodb+srv://0009sivaprasadvft:kEt4wl2eANwEHjTM@cluster0.tlfjq6h.mongodb.net/

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://0009sivaprasadvft:kEt4wl2eANwEHjTM@cluster0.tlfjq6h.mongodb.net/"  )
  .then(() => console.log("Connected mongo db"))
  .catch((e) => console.log(e));
