import useSWR from 'swr'
import { Auth, API } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import awsExports from '../aws-exports'

const [{ name: API_NAME }] = awsExports.aws_cloud_logic_custom

async function fetcher(route) {
  const response = await API.get(API_NAME, route, {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  })
  return response
}

export default function HomePage(props) {
  const { data, error } = useSWR('/hello', fetcher)

  return (
    <div>
      {/* <button onClick={getData}>Get Data</button> */}
      {!data && !error && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </div>
  )
}
