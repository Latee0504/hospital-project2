
import './App.css';
import SubLayout from './layout/SubLayout'
import './reset.css'
import TempChart from './pages/TempChart';
import MainLayout from './layout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import DetailChart from './pages/DetailChart';





function App() {
  // 현재 날짜를 선언한 변수
  const currentDate = new Date;

  return (
    <div className="App">
      <div className='div-notice'>
        <MainLayout/>
      </div>
      <div className='div-content'>
        {/* 옆에 목차 */}
        {/* <SubLayout/> */}
        <Routes>
          <Route path='/' element={<TempChart currentDate={currentDate}/>}/>
          <Route path='/detail' element={<DetailChart currentDate={currentDate}/>} /> 
        </Routes>
      </div>
    </div>
  );
}

export default App;
