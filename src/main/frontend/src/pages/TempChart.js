import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, BarElement } from 'chart.js';
import './TempChart.css'
import NewBarChart from '../craft/NewBarChart';
import { useQueries, useQuery } from '@tanstack/react-query';





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

  //셀렉트 데이트의 어제의온도와 오늘의 데이터 비교
  const [yesterdayData, setYesterdayData] = useState([]);
  const [todayData, setTodayData] = useState([]);
  const [tempChangeRecord, setTempChangeRecord] = useState('');

  const handleYesterdayDataChange = (data) => {
    setYesterdayData(data);
  };

  const handleTodayDataChange = (data) => {
    setTodayData(data);
  };

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

  //리액트 쿼리
  

  //하나로 합친 useEffect *setInterval() 시간을 지정해 재 실행 되도록 함
  useEffect(()=>{
    setInterval(() => {
      axios.all([
        axios
        .post(`/patTemp/getAllPatTemp`,{date:DateFormat(selectDate)}),
        axios
        .post(`/patTemp/getMax`, {date:DateFormat(selectDate)}),
        axios
        .post(`/patTemp/getMin`, {date:DateFormat(selectDate)}),
      ])
      .then(
        axios.spread((res1, res3, res4)=>{
          setIsShow(true)
          if(selectDate==currentDate){
            setCompData(res1.data)
            setTempData({
              ...tempData,
              min:res4.data,
              max:res3.data
            })
          }          
        })
      )
      .catch(()=>{})
    }, 5000);

    axios
    .post(`/patTemp/getDateByWeek`, {date:DateFormatDetail(selectDate)})
    .then((res)=>{
      setTreDateList(res.data)  
    })
    .catch((error)=>{})
  }, [selectDate])

  useEffect(() => {
    if (yesterdayData.length > 0 && todayData.length > 0) {
      const yesterdayAvg = yesterdayData.reduce((sum, item) => sum + item.temp, 0) / yesterdayData.length;
      const todayAvg = todayData.reduce((sum, item) => sum + item.temp, 0) / todayData.length;
      const diff = todayAvg - yesterdayAvg;
      
      let record = '';
      if (diff > 0) {
        record = `오늘의 평균 체온이 어제보다 ${diff.toFixed(2)}°C 높습니다.`;
      } 
      else if (diff < 0) {
        record = `오늘의 평균 체온이 어제보다 ${Math.abs(diff).toFixed(2)}°C 낮습니다.`;
      } 
      else {
        record = '오늘의 평균 체온이 어제와 같습니다.';
      }
      setTempChangeRecord(record);
    }
  }, [yesterdayData, todayData]);


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
        console.log(2);  
      })
      .catch((error)=>{
        console.log('30분별로 받아오기 에러', error)
      })
      console.log(3);
    }
    else{
      axios
      .post(`/patTemp/getAllPatTemp`,{date:DateFormat(selectDate)})
      .then((res)=>{
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
        console.log('반시간별 출력 실패', error)
      })
    }
  }

  useEffect(()=>{
    if(reDrawChart){
      reChartWhenTime(selectDate, isDuring)
    }
  },[isDuring, selectDate])

  useEffect(()=>{
    if(reDrawChart){
      reChartWhenDuple(selectDate, isDuple)
    }
  },[isDuple, selectDate])




  //변하지 않을 차트 그림
  compData.forEach((compOne, i)=>{
    cData.labels.push(compOne.tempDate)
    cData.datasets[0].data.push(compOne.temp)
  })

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

   //오늘의 체온 데이터로 차트를 그릴 내용을 뿌림
   chartData.forEach((chartOne, i) => {
    //1시간 간격
    if(chartOne.hour!=0){
      //30분간격
      if(chartOne.minute){
        data.labels.push(chartOne.minute)
        data.datasets[0].data.push(chartOne.temp)
      }
      else{
        data.labels.push(chartOne.hour)
        data.datasets[0].data.push(chartOne.temp)
      }
    }
    else{
      data.labels.push(chartOne.tempDate)
      data.datasets[0].data.push(chartOne.temp)
    }
    
  });


  
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
          <h3> 📌오늘의 날씨</h3>
          <table className='weather-table'>
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
                <td>{((tempData.max.temp+tempData.min.temp)/2).toFixed(2)}도</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <Line className='aaa' data={cData} options={cOptions}/>
        </div>
      </div>
      <div className='simple-view'>
        {
          treDateList.map((treDateOne, i)=>{
            return(
              <div>
                <p>{treDateOne.date}</p>
                <p>{treDateOne.temp}도</p>
              </div>
            )
          })
        }
      </div>
    
      <div className='sub-function'>
        <div>
          <div>
              <div>
                간격 선택
              </div>
              <div>
                <select value={isDuring} onChange={(e)=>{
                setIsDuring(e.target.value)
                setIsDuple(0)
                setReDrawChart(true)           
                }}>
                <option value={0}>간격 선택</option>
                <option value={1}>30분마다</option>
                <option value={2}>1시간마다</option>
                </select>
              </div>
            <div>
              범위 선택
            </div>
            <div>
              <select value={isDuple} onChange={(e)=>{
                setIsDuple(e.target.value)
                setReDrawChart(true)
              }}>
                <option value={0}>범위 선택</option>
                <option value={1}>시간별 데이터</option>
                <option value={2}>반시간별 데이터</option>
              </select>
            </div>
          </div>
          <div className='dataChart'>
            <h4>데이터 차트</h4>
            <table className='chart-table'>
              <tbody>
            {
              chartData.map((chart, i)=>{
                if(isDuring){
                  if(!isDuple){
                    if(isDuring!=0){
                      return(
                          <tr>
                            <td>{chart.hour}시 {chart.minute}분</td>
                            <td>{chart.temp}</td>
                          </tr>
                      )
                    } 
                  }        
                }
                else if(isDuple){
                  return null
                } 
              }
            ) 
            }
            </tbody> 
          </table> 
         </div>
        </div>
        <div className='temp-chart'>
         <Line data={data} options={options}/>
        </div>
      </div>
      <div className='comp-div'>
        <div className='text'>
          <button type='button' onClick={(e)=>{goBackOneDay()}}>이전</button>
          <h3>어제와 비교</h3>
          <button type='button' onClick={(e)=>{goForwardOneDay()}}>이후</button>
        </div>
        <div>
          <div> 
            <NewBarChart selectDate={DateFormat(selectDate)-1} onDataChange={handleYesterdayDataChange}/>
          </div>
          <div>
            <NewBarChart selectDate={DateFormat(selectDate)} onDataChange={handleTodayDataChange}/>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>{tempChangeRecord}</td>
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
