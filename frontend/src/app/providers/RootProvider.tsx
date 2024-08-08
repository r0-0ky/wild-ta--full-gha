import { SDKProvider } from "@telegram-apps/sdk-react"
import { AppRouter } from "../routers/AppRouter"

export const RootProvider: React.FC = () => {

  return (
    <>
      <SDKProvider acceptCustomStyles>
        <AppRouter />
      </SDKProvider>
    </>
  )
}