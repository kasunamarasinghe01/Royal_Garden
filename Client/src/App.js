
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';

//Screens
import RoomScreen from './screens/roomscreen';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/bookingscreen';
import RegisterScreen from './screens/RegisterScreen';
import UserLogin from './screens/UserLogin';
import EmployeeLogin from './screens/EnployeeLogin';
import AdminLogin from './screens/AdminLogin';
import EmpManScreen from './screens/EmpManScreen';

//import EmpRegScreen from './scren/EmpRegScreen';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './screens/Dashboard';
import AuthRoute from './utils/AuthRoute';
import LandingScreen from './screens/LandingScreen';
import ProfileScreen from './screens/ProfileScreen';
// import Stripe from './components/stripe';


function App() {
  return (
    <div className="App">
      <ToastContainer position='top-center' />
      <Navbar/>

     

      <Routes>
        {/* protected */}
        <Route path='/' exact element={<LandingScreen/>}/>
        <Route path='/room' exact element={<RoomScreen/>}/>

        <Route path="/register" exact element={<RegisterScreen />}/>

        <Route path="/login/user" exact element={<UserLogin />}/>
        <Route path="/login/employee" exact element={<EmployeeLogin />}/>
        <Route path="/login/admin" exact element={<AdminLogin />}/>

        <Route path="/home" exact element={<HomeScreen />}/>

        <Route path='/dashbord' element={<AuthRoute roles={['Admin', 'Employee']} />} >
          <Route index element={<Dashboard />}/>
        </Route>

        <Route path='/empmanscreen' element={<AuthRoute roles={['Admin']} />} >
          <Route index element={<EmpManScreen/>}/>
        </Route>

        <Route path='/profile' element={<AuthRoute roles={['Customer', 'Employee', 'Admin']} />}>
          <Route index element={<ProfileScreen/>}/>
        </Route>
        
        
        {/* <Route path='/stripe' element={<Stripe/>}></Route> */}
        
        
        <Route path="/book/:roomid/:checkin/:checkout" exact element={<BookingScreen />}/>
        {/* <Route path="/empreg" exact element={<EmpRegScreen />}/> */}
      </Routes>
      
    </div>
  );
}

export default App;
