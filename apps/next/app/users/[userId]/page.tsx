'use client'

import { Text, View } from 'react-native'
import { useParams, useRouter, useSearchParams } from 'solito/navigation'

const useUserParams = useParams<{ userId: string }>

export default function Home() {
  const { userId } = useUserParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <View className="flex-1 justify-center items-center bg-orange-900">
      <Text onPress={() => router.back()}>
        {userId}, here is the search param: {searchParams?.get('search')}
      </Text>
    </View>
  )
}
