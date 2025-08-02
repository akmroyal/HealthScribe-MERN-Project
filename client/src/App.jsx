import { Route, Routes } from "react-router"
import Home from "./page/Home"
import Dashboard from "./page/dashboard/Dashboard"
import Patdash from "./page/PatientDashboard/Patdash"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient" element={<Patdash />} />
      </Routes>
       
    </div>
  )
}

export default App
