

const jsonServer = require("json-server"); 
const router = jsonServer.router("db.json"); 

function readLastUsedDepartmentId(){  
    try{
        const data = router.db.get("lastUsedId").value(); 
        return data.departmentId; 
    }catch (error){
        console.log("Last used id cannot be found!",error); 
        return 1;
    }
}

function writeLastUsedDepartmentId(value){ 
    const lastUsedId = router.db.get("lastUsedId").value(); 
    lastUsedId.departmentId = value; 
    router.db.set("lastUsedId", lastUsedId).write(); 
}

function readLastUsedEmployeeId(){ 
    try{
        const data = router.db.get("lastUsedId").value(); 
        return data.employeeId;  
    } catch(error){ 
        console.log("Error while reading last used emplyee id!", error);
        return 1; 
    }
}

function writeLastUsedEmployeeId(value){ 
    const lastUsedId = router.db.get("lastUsedId").value(); 
    lastUsedId.employee = value; 
    router.db.set("lastUsedId", lastUsedId).write(); 
}

module.exports = {
    readLastUsedDepartmentId,
    writeLastUsedDepartmentId,
    readLastUsedEmployeeId,
    writeLastUsedEmployeeId
}



