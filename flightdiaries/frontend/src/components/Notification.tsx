import axios from "axios"
import type { NotificationProps } from "../types"
import type { JSX } from "react"

interface BackendError {
  error: {
    message: string,
    path: string[]
  }[]
}

const Notification = (props: NotificationProps) => {
  const { error } = props

  if (error === null) {
    return null
  }

  const errorMessage = axios.isAxiosError<BackendError>(error)
    ? error.response?.data.error.map(e => (
      <>
        <div>
          <strong>{e.path}</strong>: {e.message}
        </div>
      </>
    )) as JSX.Element[]
    : <>
      unknown error
    </>

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default Notification