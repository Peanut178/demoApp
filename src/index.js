// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Weather from './system/MainContent/weather';


// Fuction to show month date year
// const countries = countriesData.map((country,index) => {console.log(country ,index)});



class App extends React.Component {
  
  
  render() {
    

    return (
      <div>
    <Weather/>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
