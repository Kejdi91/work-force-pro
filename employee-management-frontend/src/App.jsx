import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OverviewPage from "./pages/dashboard/overview/OverviewPage";
import EmployeesPage from "./pages/dashboard/Employees/EmployeesPage";
import { Toaster } from "@/components/ui/sonner"
import PrivateRoute from "./lib/PrivateRoute";
import EditDepartmentPage from "./pages/dashboard/overview/EditDepartmentPage";
import TasksPage from "./pages/dashboard/tasks/TasksPage";

function App() {

  return (
    <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route path="/overview" element={<PrivateRoute> <OverviewPage/> </PrivateRoute>}/>
          <Route path="/employees" element={<PrivateRoute> <EmployeesPage/> </PrivateRoute>}/>
          <Route path="/edit-department/:id" element={<PrivateRoute> <EditDepartmentPage/> </PrivateRoute>}/>
          <Route path="/tasks" element={<PrivateRoute> <TasksPage/> </PrivateRoute>}/>
          </Routes>
          <Toaster/>
    </Router>
  );
}

export default App;
