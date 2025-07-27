import { Route, Routes } from "react-router"
import Home from "./page/Home"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
