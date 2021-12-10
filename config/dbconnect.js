

const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;

// mongodb+srv://developer:<password>@vfsmodule-dev-cluster-0.fy38b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

// connection.once("open", () => {
//     console.log("MongoDB database connection established successfully");
// });

// const { Schema } = mongoose;

module.exports = { connection };
