
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://Rochester1995t:12345@cluster0.nfmpd.mongodb.net/?retryWrites=true&w=majority,
${process.env.employee_tracker}`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));