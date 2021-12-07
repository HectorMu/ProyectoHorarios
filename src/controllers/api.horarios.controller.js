const pool = require('../lib/database')
const controller = {}

controller.test = (req, res)=>{
    res.json({Test:"Hi, im working"})
}

controller.ListAll = async(req, res)=>{
    try {
        const results = await pool.query("Select * from horarios")
        res.json(results)
    } catch (error) {
        console.log(error)
    } 
}

controller.Save = async(req, res)=>{
    const {fk_maestro } = req.params;
    const {dia, rangohoras, ubicacion} = req.body
    const newSchedule = {dia, rangohoras, ubicacion, fk_maestro}
    console.log(newSchedule)
    try {
        await pool.query("insert into horarios set ?",[newSchedule])
        res.status(200).json({insert:"succesfull"})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({insert:"something wen't wrong"})
    }
   
} 
controller.Delete=async(req,res)=>{
    const {id} = req.params
    try {
        await pool.query("delete from horarios where id = ?",[id])
        res.status(200).json({deletion:"succesfull"})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({insert:"something wen't wrong"})
    }
}

module.exports = controller

