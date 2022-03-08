import React from 'react'
import './weather.css'
import { fetchWeather } from '../fetchApi/fetchApi'
import { listCity } from '../../data/listCity';

const API_KEY = 'd8b1b55bf40247eda85162143220103';
class Weather extends React.Component {

    state = {
        query: 'London',
        weather: {},
        location: {},
        condition: {},
        temp: '',
        icon: 'day/113.png',
        value: '',
        date: '',
        timeOfDay: 'day',
    }
    componentDidMount() {
        this.searchWeather()
    }

    searchWeather = async (e) => {
        
        if (this.state.query) {
            const response = await fetchWeather(this.state.query)
            this.setState({
                location: response.data.location,
                weather: response.data.current,
                condition: response.data.current.condition,
                icon: response.data.current.condition.icon.slice(35),
                query: '',
                value: '',
                temp: Math.round(response.data.current.temp_c),
                date: response.data.location.localtime,
                timeOfDay: response.data.current.is_day ? 'day' : 'night',
            }, 
            )
        }
        else alert('Please type in a city name')
    }

    search = (e)=> {
        if(e.key == 'Enter'){
            e.preventDefault();
            this.searchWeather()
        }
    }
    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }
    handleOnClick = (event) => {
        this.setState({
            query: event.target.innerHTML,
        }, () => {
            this.searchWeather()
        })
    }
    dayOfWeek = (day, month, year) => {
        const weekDay = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        return weekDay[new Date(`${day}/${month}/${year}`).getDay()]
    }
    findMonths = (month) => {
        const months = [
            "Jan",
            "Feb",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"

        ];
        return months[month - 1]
    }

    render() {
        const { weather, condition, icon, location, temp, query, date, timeOfDay, isOpacity } = this.state
        const y = parseInt(date.slice(0, 4))
        const m = parseInt(date.slice(5, 7))
        const d = parseInt(date.slice(8, 10))
        const time = date.slice(11)
        const day = this.dayOfWeek(d, m, y)
        const month = this.findMonths(m)
        var styleWeather
        var btnStyle
        if (condition.code === 1000) {
            styleWeather = {
                backgroundImage: `url('http://localhost:3000/img/${timeOfDay}/clear.jpg')`,
            }
            btnStyle = {
                background: '#e5ba92',
            }
            if (timeOfDay === "night") {
                btnStyle = {
                    background: '#181e27',
                }
            }

        }
        else if (condition.code === 1003 ||
            condition.code === 1006 ||
            condition.code === 1009 ||
            condition.code === 1030 ||
            condition.code === 1069 ||
            condition.code === 1087 ||
            condition.code === 1135 ||
            condition.code === 1273 ||
            condition.code === 1276 ||
            condition.code === 1279 ||
            condition.code === 1282

        ) {
            styleWeather = {
                backgroundImage: `url('http://localhost:3000/img/${timeOfDay}/cloudy.jpg')`
            }
            btnStyle = {
                background: '#fa6d1b',
            }
            if (timeOfDay === "night") {
                btnStyle = {
                    background: '#181e27',
                }
            }
        }

        else if (condition.code === 1003 ||
            condition.code === 1063 ||
            condition.code === 1069 ||
            condition.code === 1072 ||
            condition.code === 1150 ||
            condition.code === 1153 ||
            condition.code === 1180 ||
            condition.code === 1183 ||
            condition.code === 1186 ||
            condition.code === 1189 ||
            condition.code === 1192 ||
            condition.code === 1195 ||
            condition.code === 1204 ||
            condition.code === 1207 ||
            condition.code === 1240 ||
            condition.code === 1243 ||
            condition.code === 1246 ||
            condition.code === 1249 ||
            condition.code === 1252


        ) {
            styleWeather = {
                backgroundImage: `url('http://localhost:3000/img/${timeOfDay}/rain.jpg')`
            }
            btnStyle = {
                background: '#647d75',
            }
            if (timeOfDay === "night") {
                btnStyle = {
                    background: '#325c80',
                }
            }
        }
        else {
            const styleWeather = {
                backgroundImage: `url('http://localhost:3000/img/${timeOfDay}/snow.jpg')`
            }
            const btnStyle = {
                background: '#4d72aa',
            }
            if (timeOfDay === "night") {
                const btnStyle = {
                    background: '#1b1b1b',
                }
            }

        }




        return (
            <div className="weather-app" style={styleWeather}>
                <div className="container-app">
                    <h3 className="brand">the weather</h3>
                    <div className="weather__tittle">
                        <h1 className="temp">{temp}&#176;</h1>
                        <div className="city-time">
                            <h1 className="name">{location.name}</h1>
                            <small>
                                <span className="time">{time} </span>
                                -
                                <span className="date"> {day} {month} {d} </span>
                            </small>

                        </div>
                        <div className="weather">
                            <img className="imgWeather" src={require(`../../images/weather/${icon}`)} />
                            <span className="condition">{condition.text}</span>
                        </div>

                    </div>
                    <div className="panel">
                        <form id="locationInput">
                            <input type="text" className="search" placeholder="Search Location..." onChange={(event) => this.handleChange(event)}
                                onKeyPress = {this.search} value={query}
                            />
                            <button type="button" className="submit" onClick={this.searchWeather} style={btnStyle} >
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </form>
                        <ul className="citys">{
                            listCity.map((city, index) => {
                                return <li className="city" key={index} onClick={(event) => this.handleOnClick(event)}>{city}</li>
                            })
                        }
                        </ul>
                        <ul className="details">
                            <h4>Weather Details</h4>
                            <li>
                                <span>Cloudy</span>
                                <span className="cloudy">{weather.cloud}%</span>
                            </li>
                            <li>
                                <span>Humidity</span>
                                <span className="humidity">{weather.humidity}%</span>
                            </li>
                            <li>
                                <span>Wind</span>
                                <span className="wind">{weather.wind_kph}km/h</span>
                            </li>
                            <li>
                                <span>Vis</span>
                                <span className="vis">{weather.vis_km}km</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )

    }

}

export default Weather