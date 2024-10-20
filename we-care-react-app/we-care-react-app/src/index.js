import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Link,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Coachsignup from './components/Coachsignup';
import Coachlogin from './components/Coachlogin';
import Usersignup from './components/Usersignup';
import Userlogin from './components/Userlogin';
import {Coachhome} from './components/Coachhome';
import {Userhome} from './components/Userhome';
import {RescheduleAppointment} from './components/Userhome';
import { applyMiddleware, legacy_createStore as createStore} from 'redux';
import {thunk} from 'redux-thunk';
import rootreducer from './reducers/Rootreducer';
import { Provider } from 'react-redux';
import {persistGate} from 'redux-persist/integration/react';
import { persistor } from './persiststore/storeconfig';
import { store } from './persiststore/storeconfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <persistGate loading = {null} persistor={persistor}>
  <BrowserRouter>
  <Routes>
    <Route index path="/" element={<Home />} />
    <Route index path="/Home" element={<Home />} />
    <Route path="/coachsignup" element={<Coachsignup/>} />
    <Route path='/coachlogin' element={<Coachlogin/>} />
    <Route path='/usersignup' element={<Usersignup/>} />
    <Route path='/userlogin' element={<Userlogin/>} />
    <Route path='/coachdashboard/*' element={<Coachhome/>} />
    <Route path='/userdashboard/*' element={<Userhome/>} />
    <Route path='/userdashboard' element={<Userhome/>} />
    {/* <Route path="/rescheduleappointment/:bookingId" element={<RescheduleAppointment/>}/> */}
  </Routes>
  </BrowserRouter>
  </persistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
