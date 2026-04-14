import axios from 'axios'
import type { Diary, newDiary } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getDiaries = async () => {
  const response = await axios.get<Diary[]>(baseUrl)
  return response.data
}

const craeteNew = async (newDiary: newDiary) => {
  const response = await axios.post<Diary>(baseUrl, newDiary)
  return response.data
}

export default {
  getDiaries,
  craeteNew
}