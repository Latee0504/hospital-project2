import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, BarElement } from 'chart.js';
import './TempChart.css'
import NewBarChart from '../craft/NewBarChart';



// Chart.js 모듈 등록
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement);




const TemperChart = ({currentDate}) => {

  //선택된 날짜의 년월일만 보여주게 바꿔줄 함수
  function DateFormat(date){
    const year = date.getFullYear() // 년 추출
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 추출 
    const day = String(date.getDate()).padStart(2, '0'); // 일 추출 
    return `${year}${month}${day}`; // 'YYYYMMDD' 형식으로 반환
  }

  function DateFormatDetail(date) {
    const year = date.getFullYear(); // 년 추출
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 추출 (1월이 0이므로 +1)
    const day = String(date.getDate()).padStart(2, '0'); // 일 추출
    const hour = String(date.getHours()).padStart(2, '0'); // 시 추출
    const minute = String(date.getMinutes()).padStart(2, '0'); // 분 추출
    return `${year}-${month}-${day} ${hour}:${minute}`; // "년-월-일 시:분" 형식으로 반환
  }
  //선택된 날짜를 담을 변수
  const[selectDate, setSelectDate] = useState(currentDate)

  const[isShow, setIsShow] = useState(false)

  //1번 박스에서 사용할 선택 변수
  const[isDuring, setIsDuring] = useState(0)

  //2번 박스에서 사용할 선택 변수
  const[isDuple, setIsDuple] = useState(0)

  //차트 다시 그릴때 필요한 변수
  const[reDrawChart, setReDrawChart] = useState(false)


  //선택한 날짜를 변경할 함수
  function handleSelectDate(date){
    setSelectDate(date)
  }

  // 실시간 체온과 시각정보를 담은 객체들을 담을 리스트
  const[chartData, setChartData] = useState([])

  // 선택한 날짜의 체온과 시각정보를 담을 객체들을 담을 리스트
  const[compData, setCompData] = useState([])

  // 전체 진료일 데이터를 받아올 리스트
  const[treDateList, setTreDateList] = useState([])  

  // 최대 최소 온도를 담을 변수
  const[tempData, setTempData] = useState({
    max: 0
    , min: 0
  })

  //실시간 차트 데이터
  const data = {
    labels: [],
    datasets: [
      {
        label: `${DateFormat(selectDate)}의 데이터`,
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  //실시간 차트 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `해당 날짜의 환자 체온 변화`,
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

  //실시간 차트 데이터(변하지않음)
  const cData = {
    labels: [],
    datasets: [
      {
        label: `실시간 환자의 데이터`,
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  //실시간 차트 옵션
  const cOptions = {
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
      setIsShow(true)
      if(selectDate==currentDate){
        setCompData(res.data)
      }
      else{
        setChartData(res.data)
      }
    })
    .catch((error)=>{
      console.log('온도 받아오기 실패', error)
    })
  }, [selectDate])
  
  // 전체 진료일 얻어오기
  useEffect(()=>{
    axios
    .get(`/patTemp/getDateByWeek`)
    .then((res)=>{
      setTreDateList(res.data)
      console.log('12313',res)
    })
    .catch((error)=>{})
  }, [])

  // 최대 온도 얻기
  useEffect(()=>{
    axios
    .post(`/patTemp/getMax`, {date:DateFormat(selectDate)})
    .then((res)=>{
      if(selectDate==currentDate){
        setTempData({
          ...tempData,
          max:res.data
        }) 
      }    
    })
  }, [tempData.max])

  // 최소 온도 얻기
  useEffect(()=>{
    axios
    .post(`/patTemp/getMin`, {date:DateFormat(selectDate)})
    .then((res)=>{
      if(selectDate==currentDate){
        setTempData({
          ...tempData,
          min:res.data
        })
      }    
    })
  }, [tempData.min])

  chartData.forEach((chartOne, i) => {
    if(chartOne.hour!=0){
      data.labels.push(chartOne.hour)
      data.datasets[0].data.push(chartOne.temp)
    }
    else if(chartOne.hour!=0&chartOne.minite!=0){
      data.labels.push(chartOne.hour)
      data.datasets[0].data.push(chartOne.temp)
      
    }
    else{
      data.labels.push(chartOne.tempDate)
      data.datasets[0].data.push(chartOne.temp)
    }   
  });

  //변하지 않을 차트 그림
  compData.forEach((compOne, i)=>{
    cData.labels.push(compOne.tempDate)
    cData.datasets[0].data.push(compOne.temp)
  })


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

  // 현재 시간으로 어디까지 출력할 지에 대해서 다시 받아주는
  function reChartWhenDuple(selectDate, isDuple){
    //시간별로
    if(isDuple==1){
      axios
      .post(`/patTemp/getDuringH`, {date:DateFormatDetail(selectDate)})
      .then((res)=>{
        console.log(selectDate)
        console.log(res.data)
        setChartData(res.data)
      })
      .catch((error)=>{
        console.log('시간별 출력 실패', error)
      })
    }
    //30분간격으로
    else if(isDuple==2){
      axios
      .post(`/patTemp/getDuringM`, {date:DateFormatDetail(selectDate)})
      .then((res)=>{
        console.log(res.data)
        setChartData(res.data)
      })
      .catch((error)=>{
        console.log('시간별 출력 실패', error)
      })
    }
    //돌아가기
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

  useEffect(()=>{
    if(reDrawChart){
      reChartWhenTime(selectDate, isDuring)
    }
    
  },[isDuring])

  useEffect(()=>{
    if(reDrawChart){
      reChartWhenDuple(selectDate, isDuple)
    }
    
  },[isDuple])

  // 날짜를 하루 전으로 변경하는 함수
  const goBackOneDay = () => {
    const previousDay = new Date(selectDate);
    previousDay.setDate(previousDay.getDate() - 1); // 하루 전으로 설정
    setSelectDate(previousDay);
  };

  // 날짜를 하루 후로 변경하는 함수
  const goForwardOneDay = () => {
    const nextDay = new Date(selectDate);
    nextDay.setDate(nextDay.getDate() + 1); // 하루 후로 설정
    setSelectDate(nextDay);
  };

  return (
    <div className='container'>
    {
      isShow==false
      ?
      null
      :
     <>
      <div className='main-chart'>
        <div className='info-select-day'>
          <div>
            네이버를 통한 오늘의 날씨
          </div>
          <table>
            <tbody>
              <tr>
                <td>최고 온도</td>
                <td>{tempData.max.temp}도</td>
              </tr>
              <tr>
                <td>최저 온도</td>
                <td>{tempData.min.temp}도</td>
              </tr>
              <tr>
                <td>평균 온도</td>
                <td>{(tempData.max.temp+tempData.min.temp)/2}도</td>
              </tr>
            </tbody>
          </table>
      </div>
        <div>
          <Line data={cData} options={cOptions}/>
        </div>
      </div>
      <div className='simple-view'>
        {
          treDateList.map((treDateOne, i)=>{
            return(
              <div>
                {treDateOne.month}월{treDateOne.day}일
              </div>
            )
          })
        }       
      </div>
    
      {/* <div className='info-content'>
        <div className='select-box'>
          <p>결과 출력 선택바</p>
          <select value={isDuring} onChange={(e)=>{
            setIsDuring(e.target.value)
            setReDrawChart(true)
            //reChartWhenTime(selectDate, isDuring)
            }}>
            <option value={0}>원래대로</option>
            <option value={1}>30분마다</option>
            <option value={2}>1시간마다</option>
          </select>
          <select value={isDuple} onChange={(e)=>{
            setIsDuple(e.target.value)
            setReDrawChart(true)
            //reChartWhenDuple(selectDate, isDuple)
          }}>
            <option value={0}>원래대로</option>
            <option value={1}>시간별 데이터</option>
            <option value={2}>반시간별 데이터</option>
          </select>
          <div>
            <button type='button' onClick={(e)=>{goBackOneDay()}}>이전</button>
            <button type='button' onClick={(e)=>{goForwardOneDay()}}>이후</button>
          </div>
        </div>
        <div className='temp-chart'>
          <Line data={data} options={options}/>
        </div>
      </div> */}
      <div className='sub-function'>
        <div className='122'>
            <div>
              시간별 그래프 출력
            </div>
            <select value={isDuring} onChange={(e)=>{
            setIsDuring(e.target.value)
            setReDrawChart(true)
            //reChartWhenTime(selectDate, isDuring)
            }}>
            <option value={0}>원래대로</option>
            <option value={1}>30분마다</option>
            <option value={2}>1시간마다</option>
          </select>
        </div>
        <div>
          <Line data={data} options={options}/>
        </div>
      </div>
      <div className='comp-div'>
        어제와 비교
        <div>
            <button type='button' onClick={(e)=>{goBackOneDay()}}>이전</button>
            <button type='button' onClick={(e)=>{goForwardOneDay()}}>이후</button>
          </div>
        <div>
          <div> 
            <NewBarChart selectDate={DateFormat(selectDate)-1} />
          </div>
          <div>
            <NewBarChart selectDate={DateFormat(selectDate)}/>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>체온 변화 기록</td>
                  <td>{}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
    }
  </div>
  )
}

export default TemperChart
