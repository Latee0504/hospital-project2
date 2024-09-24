import './App.css';
import './reset.css'
import TempChart from './pages/TempChart';
import MainLayout from './layout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import DetailChart from './pages/DetailChart';
import Orders from './pages/Orders';

import MangeCustomer from './pages/orderPage/MangeCustomer';
import MangeItem from './pages/orderPage/MangeItem';
import MangeOrdering from './pages/orderPage/MangeOrdering';


function App() {
  // 현재 날짜를 선언한 변수
  const currentDate = new Date;

  return (
    <div className="App">
      <div className='div-notice'>
        <MainLayout/>
      </div>
      <div className='div-content'>
        <Routes>
          <Route path='/' element={<TempChart currentDate={currentDate}/>}/>
          <Route path='/detail' element={<DetailChart currentDate={currentDate}/>} /> 
          <Route path='/orders' element={<Orders/>}>
            <Route path='' element={<MangeCustomer/>}/>
            <Route path='ordering' element={<MangeOrdering/>}/>
            <Route path='item' element={<MangeItem/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
