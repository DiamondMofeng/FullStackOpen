import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log("startEffect")
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response)
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <p>find countries   <input value={filter} onChange={handleFilterChange} /></p>
      <CountryList countries={countries} filter={filter} />
    </div>
  )
}

const CountryList = ({ countries, filter }) => {

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().match(filter.toLowerCase()))
  if (filter === '')
    return (
      <p>No results</p>
    )

  else if (countriesToShow.length >= 10) {
    return (
      <p>Too many matches,specify another filter</p>
    )
  }

  else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
    return (
      countriesToShow.map(c => <p>{c.name.common}<ShowInfoButton country={c} /></p>)
    )

  }
  else if (countriesToShow.length === 1) {

    return (
      <CountryInfo country={countriesToShow[0]} />
    )
  }

  return (
    <div>
      No results
    </div>
  )
}


const CountryInfo = ({ country }) => {

  const languages = []
  for (const [, value] of Object.entries(country.languages)) {
    languages.push(value)
    console.log(languages)
  }


  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <div>
        <h2>languages</h2>
        <ul>
          {
            console.log(languages)}
          {languages.map(l => <li>{l}</li>)}
        </ul>
      </div>
      <div>
        <img loading="lazy" src={country.flags.png} alt={country.name.common} />
      </div>
      <WeatherInfo city={country.capital} />
    </div>
  )
}


const ShowInfoButton = ({ country }) => {
  const [isShow, setIsShow] = useState(false)

  const handelShowButton = () => {
    setIsShow(!isShow)
  }

  // if (isShow !== true) {
  //   return (
  //     <>
  //       <button onClick={handelShowButton}>show</button>
  //     </>
  //   )
  // }

  // else return (
  //   <>
  //     <button onClick={handelShowButton}>show</button>
  //     <CountryInfo country={country} />
  //   </>
  // )
  const infoToshow = isShow
    ? <CountryInfo country={country} />
    : <></>
  return (
    <>
      <button onClick={handelShowButton}>show</button>
      {infoToshow}
    </>
  )
}

const WeatherInfo = ({ city }) => {
  const [weatherInfo, setWeatherInfo] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  console.log(api_key)
  console.log(`http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${api_key}`)
  useEffect(() =>
    axios
      .get(`http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${api_key}`)
      .then(response => {
        // console.log(response)
        setWeatherInfo(response.data)
        // console.log(weatherInfo)
      })
  )
  console.log(weatherInfo)
  // const tempC = weatherInfo.main.temp - 273.15
  // const windSpeed = weatherInfo.wind.speed
  // const windDeg = weatherInfo.wind.deg

  return (
    <div>
      <h2>Weather in {city}</h2>
{/*       
      <p><b>temperture: {weatherInfo.list[0].main.temp - 273.15} ℃</b></p>
      <img loading="lazy" src={"123"} alt={"foo"} />
      <p><b>wind: {weatherInfo.list[0].wind.speed}mph ,{weatherInfo.list[0].wind.deg} degree</b></p> */}
    </div>
  )
}
export default App