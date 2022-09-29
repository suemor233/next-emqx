import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

import { useStore } from '../../../store/index'

const DeviceControl = () => {
  const { deviceStore } = useStore()
  return (
    <div>
      <h1 className="font-ui text-4xl font-medium">设备控制</h1>
      <div className="flex gap-8 mt-3 justify-between">
        {deviceStore.getDeviceName().map((item) => (
          <DeviceItem
            key={item?.name}
            name={item?.name}
            status={item?.status}
            icon={item?.icon}
          />
        ))}
      </div>
    </div>
  )
}

interface itemDeviceType {
  name?: string
  status?: boolean
  icon?: string
}
const DeviceItem: FC<itemDeviceType> = ({ name, status, icon }) => {
  const { deviceStore } = useStore()
  return (
    <div className="flex flex-col ">
      <div
        className={`w-30 h-30 rounded-full bg-white ${
          !status && 'opacity-40'
        } flex justify-center items-center select-none transition-color duration-300 shadow-xl cursor-pointer`}
        onClick={() => {
          deviceStore.changeDeviceStatus(name as string)
        }}
      >
        <img src={icon} alt="" className="w-1/2 h-1/2" />
      </div>
      <p className="text-center select-none text-xl mt-1 ">{name}</p>
    </div>
  )
}
export default observer(DeviceControl)
