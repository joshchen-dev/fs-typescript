import type { Diary } from "../types"
import Part from "./Part"

const Content = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
      {diaries.map(diary => (
        <Part diary={diary} key={diary.id}/>
      ))}
    </div>
  )
}

export default Content