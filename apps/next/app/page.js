'use client'

import { Text, View } from 'react-native'
import { Link } from 'solito/link'

export default function Home() {
  return (
    <View className='flex-1 items-center bg-red-900' >
      <Link href="/users/fernando?search=hey!">
        <Text>Hello, Next.js App Router. Hey</Text>
      </Link>
    </View>
  )
}
