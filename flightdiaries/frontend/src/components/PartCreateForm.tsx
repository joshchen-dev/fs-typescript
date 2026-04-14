import type React from "react"
import { useState } from "react"
import diariesService from '../services/diaries'
import type { Diary, PartCreateFormProps } from "../types"
import axios from "axios"

const PartCreateForm = (props: PartCreateFormProps) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const { diaries, setDiaries } = props

  const spaceStyle: React.CSSProperties = {
    margin: '8px'
  }

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const newDiary = {
        date,
        weather,
        visibility
      } as Diary
      const createdDiary = await diariesService.craeteNew(newDiary)
      setDiaries(diaries.concat(createdDiary))
      setDate('')
      setWeather('')
      setVisibility('')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        props.setNotification(error)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <form onSubmit={diaryCreation}>
      <div>
        <label>
          <strong style={spaceStyle}>Date:</strong>
          <input type="date" name="date" value={date} onChange={event => setDate(event.target.value)} />
        </label>
      </div>
      <fieldset style={spaceStyle}>
        <legend>Select weather: </legend>
        <label><input type="radio" value='sunny' name='weather' checked={weather === 'sunny'} onChange={event => setWeather(event.target.value)} />sunny</label>
        <label><input type="radio" value='rainy' name='weather' checked={weather === 'rainy'} onChange={event => setWeather(event.target.value)} />rainy</label>
        <label><input type="radio" value='cloudy' name='weather' checked={weather === 'cloudy'} onChange={event => setWeather(event.target.value)} />cloudy</label>
        <label><input type="radio" value='stormy' name='weather' checked={weather === 'stormy'} onChange={event => setWeather(event.target.value)} />stormy</label>
        <label><input type="radio" value='windy' name='weather' checked={weather === 'windy'} onChange={event => setWeather(event.target.value)} />windy</label>
      </fieldset>
      <fieldset style={spaceStyle}>
        <legend>Select visibility: </legend>
        <label><input type="radio" value='great' name='visibility' checked={visibility === 'great'} onChange={event => setVisibility(event.target.value)} />great</label>
        <label><input type="radio" value='good' name='visibility' checked={visibility === 'good'} onChange={event => setVisibility(event.target.value)} />good</label>
        <label><input type="radio" value='ok' name='visibility' checked={visibility === 'ok'} onChange={event => setVisibility(event.target.value)} />ok</label>
        <label><input type="radio" value='poor' name='visibility' checked={visibility === 'poor'} onChange={event => setVisibility(event.target.value)} />poor</label>
      </fieldset>
      <button type="submit" style={spaceStyle}><strong>submit</strong></button>
    </form>
  )
}

export default PartCreateForm