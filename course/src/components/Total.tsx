import type { TotalProps } from "../types"

const Total = (props: TotalProps) => {
  return (
    <>
      Number of exercises {props.total}
    </>
  )
}

export default Total