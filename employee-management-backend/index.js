// index.js file kryesor per te mundesu per tbo run ne app. tone

const jsonServer = require("json-server")
const port = 8095; 

const server = jsonServer.create(); 
const middlewares = jsonServer.defaults();  

server.use(jsonServer.bodyParser); 
server.use(middlewares); 

const departmentsRoutes = require("./routes/departments"); 
const employeesRoutes = require("./routes/employees");  

departmentsRoutes(server); 
employeesRoutes(server); 

server.listen(port, () =>{
    console.log(`JSON server is running on port ${port}`);
})