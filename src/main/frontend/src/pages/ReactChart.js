import React from 'react'

const ReactChart = () => {

// Chart.js 모듈 등록
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement);

//리액트 쿼리
const fenchTempData =  async (date) => {
  const response = await axios.post(`/patTemp/getAllPatTemp`, {date})
  return response.data;
}

const fetchDateList = async (date) => {
  const response = await axios.post('/patTemp/getDateByWeek', { date });
  return response.data;
};

const fetchMaxTemp = async (date) => {
  const response = await axios.post('/patTemp/getMax', { date });
  return response.data;
};

const fetchMinTemp = async (date) => {
  const response = await axios.post('/patTemp/getMin', { date });
  return response.data;
};

  return (
    <div>
      
    </div>
  )
}

export default ReactChart
