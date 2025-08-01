import { Route, Routes } from "react-router"
import Home from "./page/Home"
import Dashboard from "./page/dashboard/Dashboard"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
       
    </div>
  )
}

export default App
