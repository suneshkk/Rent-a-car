import { RouterProvider } from "react-router-dom";
import router from "./routes/Routers.jsx"
import { Toaster } from 'react-hot-toast';
// import Theme from "./components/ui/Theme.jsx";
function App() {
  return (
    <div >
      {/* <Theme/> */}
      <RouterProvider router={router} />
       <Toaster/>
    </div>
  )
}

export default App
