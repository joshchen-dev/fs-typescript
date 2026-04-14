import { useEffect, useState } from "react";
import Header from "./components/Header";
import type { Diary } from "./types";
import diariesService from './services/diaries'
import Content from "./components/Content";
import Footer from "./components/Footer";
import PartCreateForm from "./components/PartCreateForm";
import type { AxiosError } from "axios";
import Notification from "./components/Notification";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await diariesService.getDiaries()
      setDiaries(response)
    }

    fetchData()
  }, [])

  const setNotification = (error: AxiosError) => {
    setError(error)
    setTimeout(() => {
      setError(null)
    }, 5 * 1000);
  }

  if (diaries.length === 0 || diaries === null) {
    return (
      <div>
        Now loading...
      </div>
    )
  }

  return (
    <div>
      <Header title="Flight Diaries" />
      <Notification error={error} />
      <PartCreateForm diaries={diaries} setDiaries={setDiaries} setNotification={setNotification}/>
      <Content diaries={diaries} />
      <Footer total={diaries.length} />
    </div>
  );
};

export default App;