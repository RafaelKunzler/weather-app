import { useState } from 'react'
import './App.css'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"



function App() {
  const [searchCity, setSearchCity] = useState("Guarulhos")

  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [temperature, setTemperature] = useState("")
  const [condition, setCondition] = useState("")
  const [conditionImg, setConditionImg] = useState("")

  const getWeather = async () => {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=fa348e8088984db4861232520241603&q=${searchCity}&aqi=no`)
    const data = await response.json()

    handleWeatherInfo(data)
    console.log(data);

    return data
  }
  
  window.onload = getWeather

  const handleWeatherInfo = (data) => {
    setCity(data.location.name);
    setCountry(data.location.country)
    setTemperature(data.current.temp_c)
    setCondition(data.current.condition.text)
    setConditionImg(data.current.condition.icon)
  }

  const handleWeather = (e) => {
    e.preventDefault()
    getWeather()

    console.log('aaa');

    setSearchCity("")
  }

  
  return (
    <div className='bg-slate-800 flex h-screen text-center items-center justify-center'>
      <Card className="flex flex-col w-fit min-w-72 h-fit bg-slate-100 text-slate-800 items-center shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Weather App</CardTitle>
          <CardDescription>Project for The Odin Project</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          
          <div className='flex gap-4 self-center text-xl font-semibold'>
            <p>{city}</p>
            <p>{country}</p>
          </div>

          <p className='text-6xl font-bold'>{temperature}°C</p>

          <div className='flex flex-col self-center items-center gap-2'>
            <img src={conditionImg} alt={condition} className='w-16' />
            <p>{condition}</p>
          </div>

          <form className='flex flex-col gap-2' onSubmit={handleWeather}>
            <input className='text-center' type="text" placeholder='Search City...' value={searchCity} onChange={e => setSearchCity(e.target.value)}/>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className='text-xs'>Rafael Rodrigues</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
