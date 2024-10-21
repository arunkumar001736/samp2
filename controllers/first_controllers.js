// const sequelize=require('../config/database')
// const { where } = require('sequelize');
const status_table=require('../models/Retrieve_Confirm')
// const tokenNo="8900"



exports.first_controller_create=async(req,res)=>{

    try{

        const{TokenNo,Status,Reason}=req.body;

    const token = req.headers['authorization'];


    if(token=='cal-wms')
    {
        // console.log( TokenNo,
        //     Status,
        //     Reason);

        const create_record= await status_table.create({
            TokenNo,
            Status,
            Reason
        })
        // console.log(create_record);
        

        res.status(200).json(
            {
                success: true,
                data: newRecord
            }
    );
    }
}
catch(err)
{
    res.status(500).json(
        {
            success:false,
            message:err
        }
    )
}
    
    
  
}

exports.first_controller_read=async (req,res)=>{
    try{
        // const { tokenNo } = '8900';
        const tk=req.body;
        const tokenNo=tk.tokenNo;
        // console.log(tokenNo);
        
        const token = req.headers['authorization'];
        
        if (token==="cal-wms") {
            // Send the record as JSON response
            const statusData = await status_table.findOne({
                where: { TokenNo: tokenNo }
            });
            
            res.status(200).json({
                success: true,
                data: statusData,
                token: token
            });
        } else {
            // If no record is found, return 404
            res.status(404).json({
                success: false,
                message: 'Record not found'
            });
        }
    } 
    catch (error)
    {
        // Send error response if something goes wrong
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve data',
            error: error.message
        });
    }

      

}
  
exports.first_controller_update=async(req,res)=>{
    try{
        const {TokenNo}=req.body;
        const {Status,Reason}=req.body;
        // console.log(TokenNo);

        const update_record=await status_table.findOne({
            where:{TokenNo:TokenNo}
        });
console.log(update_record);

        if(update_record)
        {
            update_record.Status=Status;
            update_record.Reason=Reason;
            await update_record.save();

           return res.status(200).json({

                Status:true,
                message:'success updated'                
            })
        }
        return res.status(404).json({
            Status:false,
            message:'Data not found'  
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:err
        })
    }
}

exports.first_controller_delete=async(req,res)=>{
    try{
        const {TokenNo}=req.body;
        // const{Status,Reason}=req.body;
console.log(TokenNo);

        const delete_record=await status_table.findOne({
            where:{TokenNo:TokenNo}
        })

        console.log(delete_record);

        if(delete_record)
        {
            await delete_record.destroy();
            // delete_record.Status=Status
            // delete_record.Reason=Reason
            // await delete_record.save();

            return res.status(200).json({
                Status:true,
                message:'success deleted'
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Record not found'
            });
        

    }
}
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: 'Failed to delete record',
            error: error.message
        });
    }


}
