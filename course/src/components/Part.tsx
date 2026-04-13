import type { CoursePart } from "../types"
import { assertNever } from "../utils"

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  let typeSpecificContent

  switch (coursePart.kind) {
    case "basic": {
      typeSpecificContent = (
        <em>{coursePart.description}</em>
      )
      break
    }
    case "background": {
      typeSpecificContent = (
        <>
          <em>{coursePart.description}</em> <br />
          refer to {coursePart.backgroundMaterial}
        </>
      )
      break
    }
    case "group": {
      typeSpecificContent = (
        <>
          project exercises {coursePart.groupProjectCount}
        </>
      )
    }
      break
    default:
      return assertNever(coursePart)
  }

  return (
    <p>
      <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br />
      {typeSpecificContent}
    </p>
  )
}

export default Part