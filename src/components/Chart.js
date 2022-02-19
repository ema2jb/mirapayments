import Nav from './Nav'
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import {useEffect, useState} from 'react'
import axios from 'axios'
import chartStyles from './Chart.module.css'
  

const ChartData =()=> {

    const [yearsData, setYearsData] = useState({})
    const [loading, setLoading] = useState(true)

    const getYearData = (awards)=>{
        const yearsData = {}
        const years = awards.map(award=>award.year)
        years.forEach(year=>{
            if (!yearsData[year]){
                yearsData[year] = 1
            }else{
                yearsData[year] =  yearsData[year] + 1
            }
        })
        setYearsData(yearsData)
        setLoading(false)
        return yearsData
    }
    

    const data = {
        labels: yearsData ? Object.keys(yearsData) : ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: yearsData?Object.values(yearsData):[12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              '#03C5FF',
              '#FFCC3E',
              '#67FA97',
              '#FF3E72',
            ],
            borderWidth: 1,
          },
        ],
      };


    useEffect(()=>{
        const options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/actors/get-awards',
            params: {nconst: 'nm0001667'},
            headers: {
              'x-rapidapi-host': 'imdb8.p.rapidapi.com',
              'x-rapidapi-key': '6991bb1a2amshf58514e386f67d8p1dad8bjsncbf292904b55'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data.resource.awards);
              getYearData(response.data.resource.awards)
          }).catch(function (error) {
              console.error(error);
          });
          
    }, [])


  return (
    <div>
        <Nav />
        <div className={chartStyles.chart}>
          {
           loading
            ?
            <h1>Loading...</h1>
            :
            <Pie data={data} />
          }
        </div>
    </div>
  )
}

export default ChartData