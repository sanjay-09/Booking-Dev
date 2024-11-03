const express=require("express");
const { handleSeat, seatData, handleSeat2 } = require("../Controllers/seatController");
const { userFetch, userCreate } = require("../Controllers/UserController");
const app=express()
const cors=require("cors")
const bodyParser=require("body-parser");

const start=()=>{
    app.use(cors({
        origin:"*"
    }))
    app.use(bodyParser.json())


   app.get("/seatsData",seatData);
   app.get("/user/:userEmail",userFetch);

   app.post("/users",userCreate);

    app.post("/seat/:seatId/user/:userId",handleSeat2);
    app.listen(3001,()=>{
        console.log("listening on the port 3001");
    })

}
start();
