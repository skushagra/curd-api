const mongoose = require("mongoose");

mongoose.connect("MONGO-DB-CONNECTION-URL", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => {
    console.log("Connection Success.");
}).catch((e) => {
    console.log("Error Occured :- " + e);
});