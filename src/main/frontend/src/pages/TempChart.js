import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './TempChart.css'


// Chart.js 모듈 등록
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);


const TemperChart = ({currentDate}) => {

  //선택된 날짜의 년월일만 보여주게 바꿔줄 함수
  function DateFormat(date){
    const year = date.getFullYear() // 년 추출
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 추출 
    const day = String(date.getDate()).padStart(2, '0'); // 일 추출 
    return `${year}${month}${day}`; // 'YYYYMMDD' 형식으로 반환
  }

  //선택된 날짜를 담을 변수
  const[selectDate, setSelectDate] = useState(currentDate)

  const[isShow, setIsShow] = useState(false)

  const[isDuring, setIsDuring] = useState(0)

  //선택한 날짜를 변경할 함수
  function handleSelectDate(date){
    setSelectDate(date)
  }

  // 실시간 체온과 시각정보를 담은 객체들을 담을 리스트
  const[chartData, setChartData] = useState([])

  // 최대 최소 온도를 담을 변수
  const[tempData, setTempData] = useState({
    max: 0
    , min: 0
  })
  

  const data = {
    labels: [],
    datasets: [
      {
        label: '실시간 환자 체온 변화',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '실시간 환자 체온 변화',
      }     
    },
    scales: {
      y: {
        min: 25.0, // y축 최소값 설정
        max: 28.0,
        ticks: {
          stepSize: 0.05, // 눈금 간격 설정
          callback: (value) => `${value}°C`, // 눈금 레이블 포맷 설정
        }
    }
  }
  };

   // 전체 온도 데이터 받아서 꾸며줌
   useEffect(()=>{
    axios
    .post(`/patTemp/getAllPatTemp`,{date:DateFormat(selectDate)})
    .then((res)=>{
      console.log(res.data)
      console.log(isShow)
      setChartData(res.data)
      setIsShow(true)
    })
    .catch((error)=>{
      console.log('온도 받아오기 실패', error)
    })
  }, [selectDate])

  // 최대 온도 얻기
  useEffect(()=>{
    axios
    .post(`/patTemp/getMax`, {date:DateFormat(selectDate)})
    .then((res)=>{
      setTempData({
        ...tempData,
        max:res.data
      })     
    })
  }, [])

  // 최소 온도 얻기
  useEffect(()=>{
    axios
    .post(`/patTemp/getMin`, {date:DateFormat(selectDate)})
    .then((res)=>{
      setTempData({
        ...tempData,
        min:res.data
      })
    })
  }, [])
 
  //오늘의 체온 데이터로 차트를 그림
  chartData.forEach((chartOne, i) => {
    if(chartOne.hour!=0){
      data.labels.push(chartOne.hour)
      data.datasets[0].data.push(chartOne.temp)
    }
    else if(chartOne.hour!=0&chartOne.minite!=0){
      data.labels.push(`${chartOne.hour} - ${chartOne.minite}`)
      data.datasets[0].data.push(chartOne.temp)
    }
    else{
      data.labels.push(chartOne.tempDate)
      data.datasets[0].data.push(chartOne.temp)
    }   
  });

  // 시간 간격에 따라 차트를 다시 그릴 함수
  function reChartWhenTime(selectDate, isDuring){
    if(isDuring==2){
      axios
      .post(`/patTemp/getDataByH`, {date:DateFormat(selectDate)})
      .then((res)=>{
        console.log(res)
        setChartData(res.data)
      })
      .catch((error)=>{
        console.log('시간별로 받아오기 에러', error)
      })
    }
    else if(isDuring==1){
      axios
      .post(`/patTemp/getDataByM`, {date:DateFormat(selectDate)})
      .then((res)=>{
        console.log(res)
        setChartData(res.data)
      })
      .catch((error)=>{
        console.log('30분별로 받아오기 에러', error)
      })
    }
    else{
      axios
      .post(`/patTemp/getAllPatTemp`,{date:DateFormat(selectDate)})
      .then((res)=>{
        console.log(res.data)
        setChartData(res.data)
      })
      .catch((error)=>{
        console.log(DateFormat(selectDate))
        console.log('함수 속의 온도 받아오기 실패', error)
      })
    }
  }

  // 시간 간격을 담을 변수를 바꿔줄 함수
  function handleSelectDuring(e){
    setIsDuring(e.target.value)
    reChartWhenTime(selectDate, isDuring)
  }


  return (
    <div className='container'>
    {
      isShow==false
      ?
      null
      :
     <>
        <div className='info-header'>
        <div>오늘의 날씨</div>
        <div>
          오늘의 최고 : {tempData.max.temp}도
        </div>
        <div>
          오늘의 최저 : {tempData.min.temp}도
        </div>
        <div>
          오늘의 평균 : {(tempData.max.temp+tempData.min.temp)/2}도
        </div>
      </div>
    
      <div className='info-content'>
        <div className='select-box'>
          <p>결과 출력 선택바</p>
          <select value={isDuring} onChange={(e)=>{handleSelectDuring(e)}}>
            <option value={0}>원래대로</option>
            <option value={1}>30분마다</option>
            <option value={2}>1시간마다</option>
          </select>
          <select>
            <options>그거</options>
          </select>
          <div>
            <button type='button' onClick={(e)=>{handleSelectDate(currentDate-1)}}>이전</button>
            <button type='button' onClick={(e)=>{handleSelectDate(currentDate+1)}}>이후</button>
          </div>
        </div>
        <div className='temp-chart'>
         <Line data={data} options={options}/>
        </div>
      </div>
     </>
    }
  </div>
  )
}

export default TemperChart
