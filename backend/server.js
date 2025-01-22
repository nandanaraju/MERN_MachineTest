const express =require('express')
const mongoose=require('mongoose')
const cors  =require('cors')
const app=express()

const task=require('./routes/task')

app.use(express.json()); 
app.use('/', task);



app.use(
    cors({
        origin:"http://localhost:5173"
    })
)

mongoose.connect("mongodb://localhost:27017/Task_test",{

})
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
