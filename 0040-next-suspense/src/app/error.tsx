'use client'

import { ErrorComponent as NextErrorComponent } from "next/dist/client/components/error-boundary";

const ErrorComponent: NextErrorComponent = ({
  error,
  reset: _,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  return (
    <>
      <h1>Error!</h1>
      <p>{error.message}</p>
    </>
  )
}

export default ErrorComponent
