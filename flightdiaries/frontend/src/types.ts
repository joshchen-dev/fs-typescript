import type { AxiosError } from "axios"
import type React from "react"

export const Weather = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy'
} as const

export type Weather = typeof Weather[keyof typeof Weather]

export const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor'
} as const

export type Visibility = typeof Visibility[keyof typeof Visibility]

export interface Diary {
  id: number,
  date: string,
  weather: Weather,
  visibility: Visibility,
}

export type newDiary = Omit<Diary, 'id'>

export interface PartCreateFormProps {
  diaries: Diary[],
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
  setNotification: (error: AxiosError) => void
}

export interface NotificationProps {
  error: AxiosError | null,
}