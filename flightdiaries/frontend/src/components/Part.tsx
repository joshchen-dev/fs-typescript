import type { Diary } from "../types"

const Part = ({ diary }: { diary: Diary }) => {
  return (
    <div>
      <><h3>{diary.date}</h3></>
      <ul>
        <li><strong>Weather</strong>: {diary.weather}</li>
        <li><strong>Visibility</strong>: {diary.visibility}</li>
      </ul>
    </div>
  )
}

export default Part