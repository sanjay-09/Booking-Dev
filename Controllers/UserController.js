const prisma = require("../Client/prisma");


const userCreate=async(req,res)=>{
    const data=req.body;
   
    try{
        await prisma.customer.create({
          data:{
            email:data.email,
            name:data.name
          }
        })
        return res.status(200).json({
            message:"Successfully created the user"

        })

    }
    catch(err){
        return res.status(500).json({
            message:"Error created the suer"

        })


    }
}

const userFetch=async(req,res)=>{
    const email=req.params.userEmail;
    try{
        const users=await prisma.customer.findUnique({
            where:{
                email
            }
        });
        if(!users){
            return res.status(200).json({
                message:"User is null"
            })
        }
      
        return res.status(200).json({
            id:users.id,
            email:users.email,
            name:users.name
        })

    }
    catch(err){
        return res.status(500).json({
            message:err.message || "Not able to fetch the data"
        })

    }
}

module.exports={
    userCreate,
    userFetch
}