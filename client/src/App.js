import Home from "./pages/booking/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./pages/User/Dashboard";
import DashboardSeller from "./pages/User/DashboardSeller";
import NewHotel from "./pages/hotels/NewHotel";
import StripeCallback from "./pages/stripe/StripeCallback";
import EditHotel from "./pages/hotels/EditHotel";
import ViewHotel from "./pages/hotels/ViewHotel";
import StripeCancel from "./pages/stripe/StripeCancel";
import StripeSuccess from "./pages/stripe/StripeSuccess";
function App() {


  return (
    <>

      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='/hotel/view/:hotelId' element={

            <ViewHotel />

          } />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path='/dashboard/seller' element={
            <ProtectedRoute>
              <DashboardSeller />
            </ProtectedRoute>
          } />


          <Route path='/new' element={
            <ProtectedRoute>
              <NewHotel />
            </ProtectedRoute>
          } />

          <Route path='/hotel/edit/:hotelId' element={
            <ProtectedRoute>
              <EditHotel />
            </ProtectedRoute>
          } />

          <Route path='/stripe/callback' element={<StripeCallback />} />
          <Route path='/stripe/success/:hotelId' element={<StripeSuccess />} />
          <Route path='/stripe/cancel' element={<StripeCancel />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
