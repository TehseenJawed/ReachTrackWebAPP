import React, {useState} from 'react'
import Skeleton from '@mui/material/Skeleton';
import Map from 'components/liveMap';

const PlaybackMap = () => {
  const [isLoaded, setIsLoaded] = useState(true)
  return (
    <div className='h-[80%] w-[70%]'>
      <Skeleton className='shadow-card' variant="rounded" width={'100%'} height={'500px'} />
    </div>
  )
}

export default PlaybackMap
