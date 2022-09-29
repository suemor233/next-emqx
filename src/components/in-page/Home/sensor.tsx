import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { MQTT, SensorItemType } from '~/store/device/type'

import { useStore } from '../../../store/index'

const Sensor = observer(() => {
  const { deviceStore } = useStore()

  return (
    <div>
      <h1 className="font-ui text-4xl font-medium">传感器</h1>
      <div className="mt-3">
        <div className="flex gap-7">
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
    <div className="flex gap-7">
      <div className="bg-white rounded-2xl h-40 w-35 p-5 flex flex-col shadow-xl">
        <img src={img} className="w-1/2 h-1/2" />
        <div className="flex flex-col whitespace-nowrap">
          <p className="text-black font-bold text-xl mt-2">{name}</p>
          <p className="text-gray-400 font-bold text-xl">
            {value}
            {unit}
          </p>
        </div>
      </div>
    </div>
  )
}
export default Sensor
