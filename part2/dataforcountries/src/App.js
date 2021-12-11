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
      <CountryInfo countries={countries} filter={filter} />
    </div>
  )
}

const CountryInfo = ({ countries, filter }) => {

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
      countriesToShow.map(c => <p>{c.name.common}</p>)
    )

  }
  else if (countriesToShow.length === 1) {
    console.log(countriesToShow[0])
    console.log(Object.entries(countriesToShow[0].languages))
    const languages = []
    for (const [key, value] of Object.entries(countriesToShow[0].languages)) {
      languages.push(value)
      console.log(languages)
    }
    return (
      <div>
        <h1>{countriesToShow[0].name.common}</h1>
        <p>capital {countriesToShow[0].capital}</p>
        <p>population {countriesToShow[0].population}</p>
        <div>
          <h2>languages</h2>
          <ul>
            {
              console.log(languages)}
            {languages.map(l => <li>{l}</li>)}
          </ul>
        </div>
        <div>
          <img loading="lazy" src={countriesToShow[0].flags.png} alt={countriesToShow[0].name.common} />
          {/* <p>{countriesToShow[0].flags}</p> */}
        </div>
      </div>
    )
  }

  return (
    <div>

    </div>
  )
}

export default App