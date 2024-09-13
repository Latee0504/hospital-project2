import React, { useEffect, useState } from 'react'
import './DetailChart.css'
import Calendar from 'react-calendar';
import axios from 'axios'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Chart.js 모듈 등록
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const DetailChart = ({currentDate}) => {

  //선택된 날짜의 년월일만 보여주게 바꿔줄 함수
  function DateFormat(date){
    const year = date.getFullYear() // 년 추출
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 추출 
    const day = String(date.getDate()).padStart(2, '0'); // 일 추출 
    return `${year}${month}${day}`; // 'YYYYMMDD' 형식으로 반환
  }

  const bData = {
    labels: [],
    datasets: [
      {
        label: '선택된 날짜의 환자 체온 변화',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const bOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '시간별 환자 체온 변화',
      },
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
  const data = {
    labels: [],
    datasets: [
      {
        label: '선택된 날짜의 환자 체온 변화',
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
        text: '시간별 환자 체온 변화',
      },
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

  //전체 평균을 담을 변수
  const[avgChart, setAvgChart] = useState(0)

  //전체 진료일 수를 담을 변수
  const[allDate, setAllDate] = useState(0)

  //선택한 날짜의 평균을 담을 변수
  const[avgWhen, setAvgWhen] = useState(0)

  // 모든 체온 정보를 담을 리스트
  const[allData, setAllData] = useState([])
  
  // 실시간 체온과 시각정보를 담은 객체들을 담을 리스트
  const[chartData, setChartData] = useState([])

  

  // 이전 정보를 담을 객체 리스트
  const[beforeData, setBeforeData] = useState([])

  //선택된 날짜를 담을 변수
  const[selectDate, setSelectDate] = useState(currentDate)

// 이전에 선택한 날짜 정보를 담을 변수
  const[beforeDate, setBeforeDate] = useState(currentDate)

  //선택한 날짜를 변경할 함수
  function handleSelectDate(date){
    setSelectDate(date)
  }


  //useEffect 전체를 하나로 합침
  useEffect(()=>{
    axios.all([
      axios
      .get(`/patTemp/getAllDate`),
      axios
      .get(`/patTemp/getAll`),
      axios
      .get(`/patTemp/getAvg`),
      axios
      .post(`/patTemp/getAvgWhen`, {date:DateFormat(selectDate)}),
      axios
      .post(`/patTemp/getAllPatTemp`,{date:DateFormat(selectDate)}),
      axios
      .post(`/patTemp/getAllPatTemp`, {date:DateFormat(beforeDate)})
    ])
    .then(
      axios.spread((res1, res2, res3, res4, res5, res6)=>{
        setAllDate(res1.data)
        setAllData(res2.data)
        setAvgChart(res3.data.temp)
        setAvgWhen(res4.data.temp)
        setChartData(res5.data)
        setBeforeData(res6.data)
      }
    ))
    .catch(()=>{})
  }, [selectDate, beforeDate])

  

  //오늘의 체온 데이터로 차트를 그림
  chartData.forEach((chartOne, i) => {
    data.labels.push(chartOne.tempDate)
    data.datasets[0].data.push(chartOne.temp)
  });

  //이전 데이터로 차트를 그림
  beforeData.forEach((beforeOne, i) => {
    bData.labels.push(beforeOne.tempDate)
    bData.datasets[0].data.push(beforeOne.temp)
  });

  return (
    <div className='detail-div'>
      <div className='redeah'>
        <div className='top-content'>
          <h2>📌그린대학병원 환자 데이터</h2>
          <table className='detail-table'>
            <tbody>
              <tr>
                <td>전체 평균</td>
                <td>{avgChart}</td>
              </tr>
              <tr>
                <td>날짜 평균</td>
                <td>{avgWhen}</td>
              </tr>
              <tr>
                <td>총 데이터 수</td>
                <td>{allData.length}</td>
              </tr>
              <tr>
                <td>총 일수</td>
                <td>{allDate}일</td>
              </tr>
            </tbody>
          </table>
          
        </div>
        <div className='top-sub-content'>
            <div>
              <h2>📌이전에 선택한 날짜의 정보</h2>
              <div>
                <Line data={bData} options={bOptions}/>
              </div>  
            </div>
            <div>
              <h2>비교 정보</h2>
              <table>
                <tbody>
                  <tr>
                    <td>온도 차이</td>
                    <td>{}</td>
                  </tr>
                  <tr>
                    <td>시간 별 상승 온도</td>
                    <td>{}</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>
      
      <div className='sub-content'>
        <div>
          <Line data={data} options={options}/>
        </div>
        <div className='rev-temp'>
          {
            DateFormat(selectDate)==DateFormat(currentDate)
            ?
            <Calendar 
            onChange={(date)=>{
              handleSelectDate(date)
            }} 
            value={selectDate}
            calendarType="gregory" 
            view="month"
            prev2Label={null}
            next2Label={null}
            showNeighboringMonth={false}/> 
            :
            <div className='notice'>
              🩸해당 환자의 {DateFormat(selectDate)}의 체온 기록입니다
              <button type='button' onClick={(e)=>{
                setBeforeDate(selectDate)
                setSelectDate(currentDate)}}>오늘 날짜로 돌아가기
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default DetailChart
