import { useState } from 'react'
import { useStore } from '../../../store/index';

const Mode = () => {
  return (
    <div>
      <h1 className="font-ui text-4xl font-medium">模式</h1>
      <div className="mt-3">
        <ModeItem />
      </div>
    </div>
  )
}

const ModeItem = () => {
  const {deviceStore} = useStore()
  const [mode, setMode] = useState('普通模式')
  const handleMode = () => {
    if (mode === '普通模式') {
      setMode('离家模式')
      deviceStore.leaveHomeMode()
    } else {
      setMode('普通模式')
    }
  }
  return (
    <div className="flex gap-7 justify-between">
      <div
        className={`bg-white rounded-2xl h-22 w-70 p-2 flex items-center gap-3 shadow-xl cursor-pointer transition-opacity duration-300 ${
          mode === '离家模式' && 'opacity-40'
        }`}
        onClick={() => handleMode()}
      >
        <img src="/img/away_home.png" className="h-1/2" />
        <p className="text-black font-bold text-xl">普通模式</p>
      </div>

      <div
        className={`bg-white rounded-2xl h-22 w-70 p-2 flex items-center gap-3 shadow-xl cursor-pointer transition-opacity duration-300
      ${mode === '普通模式' && 'opacity-40'}
      `}
        onClick={() => handleMode()}
      >
        <img src="/img/away_home.png" className="h-1/2" />
        <p className="text-black font-bold text-xl">离家模式</p>
      </div>
    </div>
  )
}

export default Mode
