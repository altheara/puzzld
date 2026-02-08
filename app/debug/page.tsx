// app/debug/page.tsx
import { auth } from '@clerk/nextjs/server'

export default async function DebugPage() {
  const { userId } = await auth()

  return (
    <pre>
      {JSON.stringify({ userId }, null, 2)}
      {userId ? 'Logged in' : 'Logged out'}
    </pre>
  )
}
