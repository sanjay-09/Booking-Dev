const prismaClient=require("../Client/prisma");
const {Mutex}=require("async-mutex");
const bookingMutex=new Mutex();

const handleSeat=async(req,res)=>{
  const release=await bookingMutex.acquire();
    try{
        console.log(req.params.seatId)
        console.log(req.params.userId);
        const seatId=parseInt(req.params.seatId,10);
        const userId=parseInt(req.params.userId,10);
        await prismaClient.$transaction(async(prisma)=>{
            const seatAvaiable=await prisma.seat.findUnique({
                where:{
                    id:seatId
                }

            })
            console.log("isSeatAvaiable",seatAvaiable);
            if(seatAvaiable.isBooked){
                throw new Error("seat already booked")
            }

            //updateSeatStatus
            await prisma.seat.update({
                where:{
                    id:seatId
                },
                data:{
                   isBooked:true,
                   status:'Booked'
                }
            })
            //customer
            await prisma.userSeat.create({
                data:{
                    custId:userId,
                    seatId:seatId
                }
            })
        });
        return res.status(200).json({
            message:"Booked successfully"

        })

    }
    catch(err){
        return res.status(500).json({
            message:err.message || "An error occurred while booking the seat"
        })

    }
    finally{
        release();

    }
}


const handleSeat2=async(req,res)=>{

    try{
       
        const seatId=parseInt(req.params.seatId,10);
        const userId=parseInt(req.params.userId,10);
        await prismaClient.$transaction(async(prisma)=>{

            const seat=await prisma.seat.findUnique({
                where:{
                    id:seatId
                }

            })
           
            if(seat.isBooked){
                console.log("---why----");
               throw new Error("seat already booked")
            }
            console.log("seatVersion--->",seat);
           const bookedSeat= await prisma.seat.updateMany({
                where:{
                    id:seatId,
                    version:seat.version
                },
                data:{
                    isBooked:true,
                    status:'Booked',
                    version:seat.version+1

                }
                
            })

            console.log("booked seat---->",bookedSeat);
            if(bookedSeat.count===0){
                throw new Error('seat already booked 2');
            }

            await prisma.userSeat.create({
                data:{
                    custId:userId,
                    seatId:seatId
                }
            })

        
            return res.status(200).json({
                message:"Booked the seat"
            })



        })

    }
    catch(err){

        return res.status(500).json(
           {
             message:err.message || 'error while booking the seat'
           }

        )

    }

}

const seatData=async(req,res)=>{
    try{

        const data=await prismaClient.seat.findMany();
        console.log("data",data);
        return res.status(200).json({
            message:"Successfully fetched the data",
            data
        })

    }
    catch(err){
        return res.status(500).json({
            message:err.message || "Error in fetching the seats"
        })
    }
}
module.exports={
    handleSeat,
    seatData,
    handleSeat2
}