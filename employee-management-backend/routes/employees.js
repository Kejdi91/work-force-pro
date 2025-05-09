const { response } = require("express");

module.exports = function(server){         // e bejm si modul te ksportushem dhe ktu presim serverin qe bem konfigurim tek index.js
    const {readLastUsedEmployeeId} = require("../utils"); // bejm require nga utils.js  funskionin e readLastUsedEmployeeId
    const jsonServer = require("json-server");            // bejm nje variable per te mare jsonserver
    const router = jsonServer.router("db.json")            // bejm lidhjen me folderin db.json
    let employeeIdCounter = readLastUsedEmployeeId();        // bejm variable dhe e bejm baraz me funskionin tek utils.js ,e bejm track
    
   // Endpoint - create new emplyee by department id
    server.post("/api/employee/:id", (request, response) =>{
        const departmentId = parseInt(request.params.id);          // nxjerrim id e departamentit             
        const requestBody = request.body;          // ne body do dergojme te dhonat e ktij puntori qe po shtojme
        const departmentsData = router.db.get("departments").value();  // i lexojme krejt departamentet qe kemi
        const index = departmentsData.findIndex((dept) => dept.id === departmentId);  // tani na duhet te gjejme se ne cilin departament na duhet me gjet qe te shtojme kte puntor qe ta barazojme me id 
    
        if(index === -1){  // nese indexi nuk eshte gjetur
            return response.status(404).json({error:"Department not found"}); // athere kthejme kte mesazh
        } else {   // nese e ka gjet 
            const department = departmentsData[index]; // departamentin qe po duham ti shtojme puntorin ja kemi rujt ne kte variable
            const employeeList = department.employee_list; // tani e kemi listen me employee
            // If id of emplyee is undefined - create employee
            if(requestBody.id === undefined){                    // tani bejm funksionin per me shtu nji puntor te ri
                let employeeId; // nji variable pa vler vtm per ta sinjalizuar
                employeeId = ++employeeIdCounter;    // i shtojme nga nji dhe ja vem ++ para sepse ne fillim e rrit dhe pastaj vendos vleren
            
                const newEmployee = {       // ktu krijojme nje new employe si objekt dhe i ruajme te dhenat
                    id: employeeId,
                    name: requestBody.name,
                    address: requestBody.address,
                    email: requestBody.email,
                    phone: requestBody.phone,
                };
            
                employeeList.push(newEmployee);    // ktu behet push vtm ne listen lokale      // tani bejm nje funskion per me shtu kte puntor te ri
            
                department.employee_list = employeeList;     // tani dhe kte employee list e ruajme tek departamenti   
            
                router.db.set("departments", departmentsData).write();  // dhe kshu ja rishkruajme             }          
        
                const lastUsedId = router.db.get("lastUsedId").value();      // tani bejm update lastUsEmployeeId
                lastUsedId.employeeId = employeeIdCounter;                   // e rrisim tek objekti 
                router.db.set("lastUsedId", lastUsedId).write(); // dhe kte objekt e bejm set ne db
                response.json(departmentsData[index])         // kjo ja kthen komplet listen e puntorve e atij departamenti qe e kemi ne baz te indexit qe e gjetem ne fillim
            } else {                                          // nqs id eshte e definuar
                const employeeIndex = department.employee_list.findIndex(   // na duhet te gjejm dhe vet indexin e puntorit,parseInt sepse mund te na vij edhe si nr edhe si text
                    (empl) => empl.id === parseInt(requestBody.id)
                );         
                if(employeeIndex === -1){  // nese se ka gjet 
                        response.status(404).json({message:"Employee not found in the department"})  // shfaq kte mesazh
                } else {         // nese e ka gjet 
                    requestBody.id = parseInt(requestBody.id);     // marim id e atij puntori
                
                    const updatedEmployee = {        // bejm nje objekt
                        id:requestBody.id,
                        name:requestBody.name,
                        address:requestBody.email,
                        email:requestBody.phone,
                    }
                
                    department.employee_list[employeeIndex] = {       // te ai puntori qe gjetem
                        ...department.employee_list[employeeIndex],   // me spread operator i kalojme te gjith puntoret dhe shofim indexin e puntorit te ri
                        ...updatedEmployee,                           // dhe ktu dergojme puntorin e ri
                    }
                    router.db.set("departments", departmentsData).write();     // i dergojme edhe nji her departamentet te bome update
                    response.json(department);      // i cojme krejt departamentin qe i bem update 1 puntor
                }
            }
        }
    });                                       

    // Endpoint to get employee list by department id
    server.get("/api/employee/list/:id", (request, response) => {
        const departmentId = parseInt(request.params.id);  // nxjerrim id dinamikisht prej endpointit
        const departmentsData = router.db.get("departments").value(); // bejm kte variable dhe marim departments 
        const department = departmentsData.find((depts) => depts.id === departmentId);      // bejm find ate departament qe kemi kerku ne baz te id ,dhe pastaj bejm kerkes qe ta gjej ate id
    
        if(!department){    // nese se gjen 
            response.status(404).json({error:"Department not found!"});  // shfaq kte mesazh
        }else{  // perndryshe nqs e ka gjet 
            const employeeList = department.employee_list;  // njelloj celsi per tu futur tek lista puntorve
            response.json(employeeList);     // i dergojme pra ate listen qe e nxorrem prej departamentit
        }
    });
    
    // Endpoint - get employee by id
    server.get("/api/employees/:dept_id/:emp_id",(request,response) =>{  // ne baz te departamentit do marim nje puntor te caktum
        const departmentId = parseInt(request.params.dept_id);        // ne fillim nxjerrim ne parametra kto id (params)
        const employeeId = parseInt(request.params.emp_id);
        const departmentsData = router.db.get("departments").value();     // lexojme te dhonat e krejt departamentit 
        const department = departmentsData.find((depts) => depts.id === departmentId); // shkojme te gjejme departamentin qe kemi lyp
    
        if(!department) {
            response.status(404).json({error: "Department not found!"});
        } else {
            const employee = department.employee_list.find((empl) => empl.id === employeeId);
            if(!employee){
                response.status(404).json({error: "Employee not found!"});
            }else {
                response.json(employee);
            }
        }
    });      
    
    // Endpoint - delete employee id
    server.delete("/api/employees/delete/:id", (request, response) => {
        const employeeId = parseFloat.Int(request.params.id);
        const departmentsData = router.get("departments").value();

        let employeeDeleted = false;
        departmentsData.foreach((department) => {
            const employeeIndex = department.employee_list.findIndex(
                (employee) => employeeId === employeeId
            );
            if(employeeIndex !== -1){
                department.employee_list.slice(employeeIndex, 1);
                employeeDeleted = true;
            }
        });
    
        if(employeeDeleted){
            router.db.set("departments" , departmentsData).write();
            response.json({message:"Employee deleted successfully!"});
        }else{
            response.status(404).json({error:"Employee not found in any department!"});
        }
    });
};