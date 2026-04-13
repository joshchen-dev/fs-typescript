import type { CoursePart } from "../types"
import Part from "./Part"

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return (
    <>
      {courseParts.map(course => (
        <Part coursePart={course} />
      ))}
    </>
  )
}

export default Content