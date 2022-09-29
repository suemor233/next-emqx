import { makeAutoObservable } from 'mobx'
import type { MqttClient } from 'mqtt'
import mqtt from 'mqtt'
import { v4 as uuidv4 } from 'uuid'

import { isClientSide } from '~/utils/env'

import { SensorType, esp32_JDQ } from './type'
import { MQTT } from './type'

interface DeviceType {
  fan: boolean
  curtain: boolean
  humidifier: boolean
  access: boolean
}

interface DeviceMatchType {
  name: string
  status: boolean
  icon: string
}
export default class DeviceStore {
  device: Partial<DeviceType> = {
    fan: false,
    curtain: false,
    humidifier: false,
    access: false,
  }

  sensor: SensorType = {
    MQTT_PUB_TEMP: {
      name: '温度',
      value: '0',
      img: '/img/temperature.png',
      unit: ' ℃',
    },
    MQTT_PUB_HUM: {
      name: '湿度',
      value: '0',
      img: '/img/humidity.png',
      unit: ' %',
    },
    MQTT_PUB_Bh1750: {
      name: '光照',
      value: '0',
      img: '/img/light.png',
      unit: ' Lux',
    },
    MQTT_PUB_MQ4: {
      name: '燃气',
      value: '安全',
      img: '/img/gas.png',
      unit: '',
    },
    MQTT_PUB_HCSR501: {
      name: '人体红外',
      value: '无人',
      img: '/img/human.png',
      unit: '',
    },
  }

  client: MqttClient | null = null

  constructor() {
    makeAutoObservable(this)

    if (isClientSide()) {
      this.mqttConnect()
      this.subscribe()
    }
  }

  mqttConnect() {
    this.client = mqtt.connect('ws://43.143.48.34', {
      port: 8083,
      clientId: uuidv4(),
      path: '/mqtt',
    })
  }

  subscribe() {
    if (this.client) {
      this.client.subscribe(MQTT.MQTT_PUB_TEMP, { qos: 0 })
      this.client.subscribe(MQTT.MQTT_PUB_HUM, { qos: 0 })
      this.client.subscribe(MQTT.MQTT_PUB_Bh1750, { qos: 0 })
      this.client.subscribe(MQTT.MQTT_PUB_MQ4, { qos: 0 })
      this.client.subscribe(MQTT.MQTT_PUB_HCSR501, { qos: 0 })
      this.client.on('message', (topic: keyof typeof MQTT, message) => {
        const payload = { topic, message: message.toString() }
        if (this.sensor[payload.topic]) {
          this.sensor[payload.topic].value = payload.message
        }
      })

      this.client.on('error', () => {
        console.log('error')
      })

      this.client.on('reconnect', () => {
        console.log('Reconnecting')
      })
    }
  }

  getDeviceName() {
    const deviceMatch: Partial<DeviceMatchType[]> = []
    Object.keys(this.device).map((item) =>
      deviceMatch.push({
        name: item,
        status: this.device[item],
        icon: `/img/${item}.png`,
      }),
    )

    return deviceMatch
  }

  changeDeviceStatus(name: string) {
    console.log(name)
    if (name === 'fan') {
      this.client?.publish(esp32_JDQ, this.device.fan ? '11' : '1')
    } else if (name === 'curtain') {
      this.client?.publish(esp32_JDQ, this.device.curtain ? '12' : '2')
    } else if (name === 'humidifier') {
      this.client?.publish(esp32_JDQ, this.device.humidifier ? '13' : '3')
    } else if (name === 'access') {
      this.client?.publish(esp32_JDQ, this.device.access ? '14' : '4')
    }
    this.device[name] = !this.device[name]
  }

  leaveHomeMode() {
    this.client?.publish(esp32_JDQ, '20')

    this.device.fan = false
    this.device.curtain = false
    this.device.humidifier = false
    this.device.access = false
  }
}
