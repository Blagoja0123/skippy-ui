import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingAvatar = () => {
  return (
    <div><Skeleton className="h-12 w-12 rounded-full" /></div>
  )
}

export default LoadingAvatar