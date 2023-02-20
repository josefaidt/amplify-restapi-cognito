import { Authenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import awsExports from '../aws-exports'

Amplify.configure(awsExports)

export default function MyApp({ Component, pageProps }) {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <Component {...pageProps} />
        </main>
      )}
    </Authenticator>
  )
}
