import React, { useEffect, useState } from 'react'
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

  //선택된 날짜를 담을 변수
  const[selectDate, setSelectDate] = useState(currentDate)

  //선택한 날짜를 변경할 함수
  function handleSelectDate(date){
    setSelectDate(date)
  }

  // 환자 전체 진료일 수를 받아옴
  useEffect(()=>{
    axios
    .get(`/patTemp/getAllDate`)
    .then((res)=>{
      setAllDate(res.data)
      console.log(res)
    })
    .catch((error)=>{
      console.log('전체 진료일 받아오기 에러', error)
    })
  }, [chartData])

  // 환자의 온도 전체 데이터 받아옴
  useEffect(()=>{
    axios
    .get(`/patTemp/getAll`)
    .then((res)=>{
      setAllData(res.data)
      console.log('환자 전체 데이터')
    })
    .catch((error)=>{
      console.log('전체 받아오면서 에러', error)
    })
  }, [chartData])

  // 전체 데이터의 평균
  useEffect(()=>{
    axios
    .get(`/patTemp/getAvg`)
    .then((res)=>{
      setAvgChart(res.data.temp)
      console.log('전체평균 성공',res)
    })
    .catch((error)=>{
      console.log('전체 평균에서 에러', error)
    })
  }, [chartData])

  //선택한 날짜의 평균
  useEffect(()=>{
    axios
    .post(`/patTemp/getAvgWhen`, {date:DateFormat(selectDate)})
    .then((res)=>{
      setAvgWhen(res.data.temp)
    })
  }, [chartData])

  // 전체 온도 데이터 받아서 꾸며줌(10개)
  useEffect(()=>{
    axios
    .post(`/patTemp/getAllPatTemp`,{date:DateFormat(selectDate)})
    .then((res)=>{
      setChartData(res.data)
    })
    .catch((error)=>{
      console.log(DateFormat(selectDate))
      console.log('온도 받아오기 실패', error)
    })
  }, [selectDate, chartData])

  //오늘의 체온 데이터로 차트를 그림
  chartData.forEach((chartOne, i) => {
    data.labels.push(chartOne.tempDate)
    data.datasets[0].data.push(chartOne.temp)
  });

  return (
    <>
      <div className='top-content'>
        <div>
          <table>
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
              console.log(selectDate)
            }} 
            value={selectDate}
            calendarType="gregory" 
            view="month"
            prev2Label={null}
            next2Label={null}
            showNeighboringMonth={false}/> 
            :
            <div className='notice'>
              해당 환자의 {DateFormat(selectDate)}의 체온 기록입니다
              <button type='button' onClick={(e)=>{setSelectDate(currentDate)}}>오늘 날짜로 돌아가기</button>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default DetailChart
