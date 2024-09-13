import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, BarElement } from 'chart.js';
import axios from 'axios';


// Chart.js 모듈 등록
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement);

const NewBarChart = ({selectDate, onDataChange}) => {

  

  //담을 변수
  const[barData, setBarData] = useState([])

  //보여줄 상태 변수
  const[isShow, setIsShow] = useState(false)

  //axios
  useEffect(()=>{
    axios
    .post(`/patTemp/getAllPatTemp`,{date:selectDate})
    .then((res)=>{
      console.log(res.data)
      setBarData(res.data)
      if (onDataChange) {
        onDataChange(res.data); //여기서 부모 컴포넌트로 데이터 전달
      }
      setIsShow(true)
    })
    .catch((error)=>{
      
      console.log('함수 속의 온도 받아오기 실패', error)
    })
  },[selectDate])

   //바 차트 데이터
   const bData = {
    labels: [],
    datasets: [
      {
        label: `${selectDate}의 데이터`,
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  //바 차트 옵션
  const bOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${selectDate}의 환자 체온 변화`,
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

  barData.forEach((barOne, i)=>{
    bData.labels.push(barOne.tempDate)
    bData.datasets[0].data.push(barOne.temp)
  })
  

  return (
    <div>
      {
        isShow==false
        ?
        null
        :
        <Bar data={bData} options={bOptions}/>
      }
      
    </div>
  )
}

export default NewBarChart
