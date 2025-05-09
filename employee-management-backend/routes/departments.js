module.exports = function (server){                     
    const {readLastUsedDepartmentId} = require("../utils");  

    let departmentIdCounter = readLastUsedDepartmentId(); 
    
    const jsonServer = require("json-server"); 

    const router = jsonServer.router("db.json"); 

    // Endpointi - create department
    server.post("/api/departments", (request, response) => { 
        const requestBody = request.body;  
        
        if(requestBody.name === undefined){ 
            return response 
            .status(403)  
            .json({message: "Name of department must be provided!"}); 
        }

        if(requestBody.id === undefined) { 
            let departmentId = ++departmentIdCounter; 
            const newDepartment = { 
                id: departmentId,
                name: requestBody.name,  
                employee_list: [],
            }

            const departmentsData = router.db.get("departments").value(); 
            departmentsData.push(newDepartment) 
        
            router.db.set("departments", departmentsData).write(); 
        
            const lastusedId = router.db.get("lastUsedId").value();  
            lastusedId.departmentId = departmentIdCounter;          
            router.db.set("lastUsedId", lastusedId).write(); // vendose lastusedid e bere update duke u rritur per 1
        
            response.status(201).json(newDepartment); // kjo e kthen response nepermjet http
        } else { 
            const departmentsData = router.db.get("departments").value(); // marim nga db.json departments
            const departmentId = parseInt(requestBody.id, 10); // e bejm parse int sepse na duhet si nr edhe nese vjen si string
            const index = departmentsData.findIndex( // duhet ta ruajme si index sepse push e bejme ne baze te index jo id
                (dept) => dept.id === departmentId
            );
            
            if(index === -1){  // nese nuk e ka gjet 
                response.status(404).json({error: "Department not found"}); // i dergojme nje mesazh
            } else{ // nqs e ka gjet
                departmentsData[index] = {      // departmentsdata ne baze te indexit eshte e = 
                    ...departmentsData[index],  // ...spread operator ,pershkruji krjet departamentet ekzistuse deri ne index
                    ...requestBody,            // edhe shko pershkruje e dhe kte request body
                }
                router.db.set("departments", departmentsData).write(); // ruaje ate departmentsData
                response.json(departmentsData[index]); // nese index eshte 0 ktu do na e kthej te bome update
            }
        }
    });  

    // Endpointi - fetch all departments
    server.get("/api/departments/all", (request , response) => {         // kshu marim te gjith endpointin e departments dhe presim nji request dhe response
        const departmentsData = router.db.get("departments").value();    // bejm nje variable dhe marim te gjith departments
        response.json(departmentsData);                                // dhe tgjitha ca mori ti rikthej si response.json dhe ja kalojm ne departmens Data
    })

    // Endpoint - fetch department by id ,bejm fetch vtm nji deparment ne baz te id qe dergojm
    // https://localhost:8095/api/department/2
    server.get("/api/department/:id", (request, response) => {        // perdorim metoden get dhe ne fund /:id qe te dim qe behet fjal per id
        const departmentId = parseInt(request.params.id);             // bejm nje variable dhe kte id e nxjerrim prej requestit,parseInt metod qe e kthen ne nr edhe nqs vjen si text

        const departmentsData = router.db.get("departments").value();  // ktu e marim te gjith departamentin

        const department = departmentsData.find((department) => department.id === departmentId); // e bejm me metoden find per te iterru neper array dhe ben krahasim e departmentId me department.id derisa ta gjej
        
        if(!department) {
            response.status(404).json({error:"Department not found"});  // pasi e kemi rujt nje linjen 71 bejm nje nqs se ka gjet athere i kthen nje response error dhe nji mesazh
        } else {
            response.status(200).json(department); // i kthejme statusin 200 dhe i kthejme vet departmentin qe e ka kerku
        }
    });

    // Endpoint - delete department by id
    server.delete("/api/department/delete/:id", (request,response) =>{ // tani do perdorim ne htpp metoden delete
        const departmentId = parseInt(request.params.id);// e pret departmentid ne baz te parametrit
        
        const departmentsData = router.db.get("departments").value(); // marim te dhenat prej departamentit
        
        const departmentIndex = departmentsData.findIndex((dept) => dept.id === departmentId); // tani na duhet te gjem indexin ,dept .id gjeje kur tjet e barabarte me id qe na vjen dinamikisht departmentId
        
        if(departmentIndex === -1){    // nqs nuk e ka gjet indexin
            return response.status(404).json({error:"Department not found"}); // kthejme kte mesazh
        }

        const department = departmentsData[departmentIndex];  // bejm nje variable qe ne departmentsData ti qasemi departmentindex qe beme me lart
    
        if(department.employee_list.length > 0){    // shofim kushtin nese employee list eshte me e madhe se 0 dhe ka puntor ne array
            return response.status(400).json({error:"Cannot delete department with employees!"}); // athere bejm te shfaqet ky mesazh
        }

        const updatedDepartments = departmentsData.filter(// e filtrojm se po punojm me db.json
            (dept) => dept.id !== departmentId);  // secili qe eshte i ndryshem e plotson kushtin dhe e mabn ne kte variable,perndrsyhe kush nuk eshte e njejte nuk e man ate e filtron
    
        router.db.set("departments", updatedDepartments).write();  // ktu ja dergojme ne departments dhe e rishkruajme
    
        response.json({message:"Department deleted successfully.!"});  // dhe i dergojme kte mesazh
    });                                                                                      
};