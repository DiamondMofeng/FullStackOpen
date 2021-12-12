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
      countriesToShow.map(c => <p>{c.name.common}<ShowInfoButton country={c}/></p>)
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
      <div>
        {/* <h2>Weather in {country.capital}</h2> */}

      </div>
    </div>
  )
}


const ShowInfoButton = ({ country }) => {
  const [isShow, setIsShow] = useState(false)

  const handelShowButton = () => {
    setIsShow(!isShow)
  }

  if (isShow !== true) {
    return (
      <>
        <button onClick={handelShowButton}>show</button>
      </>
    )
  }

  else return (
    <>
      <button onClick={handelShowButton}>show</button>
      <CountryInfo country={country} />
    </>
  )
}


export default App