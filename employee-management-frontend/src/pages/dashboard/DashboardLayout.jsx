import Navbar from "../../components/shared/navbar/Navbar"

const DashboardLayout = ({children}) => {
  return (
    <div>
        <Navbar/>
        <hr/>
        <main className="container mx-auto">
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout