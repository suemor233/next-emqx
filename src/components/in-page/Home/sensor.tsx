import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

import type { SensorItemType } from '~/store/device/type';

import { useStore } from '../../../store/index'

const Sensor = observer(() => {
  const { deviceStore } = useStore()

  return (
    <div>
      <h1 className="font-ui text-4xl font-medium select-none phone:text-2xl">传感器</h1>
      <div className="mt-3">
        <div className="grid grid-cols-5 gap-5 phone:grid-cols-2 w900:grid-cols-3">
          {Object.keys(deviceStore.sensor).map((key) => (
            <SensorItem
              key={key}
              name={deviceStore.sensor[key].name}
              value={deviceStore.sensor[key].value}
              img={deviceStore.sensor[key].img}
              unit={deviceStore.sensor[key].unit}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

const SensorItem: FC<SensorItemType> = (props) => {
  const { name, value, img, unit } = props
  return (
      <div className="bg-white rounded-2xl h-50 w-45 phone:h-40 phone:w-45 p-5 flex flex-col shadow-xl" >
        <img src={img} className="w-1/2 h-1/2" />
        <div className="flex flex-col whitespace-nowrap">
          <p className="text-black font-bold text-xl mt-2">{name}</p>
          <p className="text-gray-400 font-bold text-xl">
            {value}
            {unit}
          </p>
        </div>
      </div>
  )
}
export default Sensor
