import { findKey } from 'lodash-es'
import { makeAutoObservable, reaction } from 'mobx'
import type { MqttClient } from 'mqtt'
import mqtt from 'mqtt'
import { v4 as uuidv4 } from 'uuid'

import { isClientSide } from '~/utils/env'

import {
  DEVICE,
  DEVICE_AGAINST,
  DeviceMatchSend,
  DeviceMatchType,
  DeviceType,
  LinkageMap,
  SensorType,
} from './type'
import { MQTT, esp32_JDQ } from './type'

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

  mode = 'home'

  linkage = {
    sensor: '温度',
    condition: '>',
    value: '',
    state: '开',
    device: '风扇',
    launch: false,
  }

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
    this.client?.publish(
      esp32_JDQ,
      !this.device[name]
        ? `${DeviceMatchSend[name]}`
        : `${DeviceMatchSend[name] + 10}`,
    )
    this.device[name] = !this.device[name]
    if (this.mode === 'leave') {
      this.changeMode('home')
    }
  }

  changeMode(name: string) {
    this.mode = name
    if (name === 'leave') {
      this.leaveHomeMode()
    }
  }

  leaveHomeMode() {
    this.client?.publish(esp32_JDQ, '20')
    this.device.fan = false
    this.device.curtain = false
    this.device.humidifier = false
    this.device.access = false
  }

  startLinkage() {
    const { sensor, condition, value, state, device } = this.linkage
    const _sensor = this.sensor[LinkageMap[sensor]].value
    const _device = DEVICE_AGAINST[device]
    if (condition === '>' && Number(_sensor) > Number(value)) {
      this.controlDevice(_device, state)
    } else if (condition === '<' && Number(_sensor) < Number(value)) {
      this.controlDevice(_device, state)
    }
  }

  controlDevice(device: number, state: string) {
      this.client?.publish(
        esp32_JDQ,
        state === '开'
          ? `${DeviceMatchSend[device]}`
          : `${DeviceMatchSend[device] + 10}`,
      )
      this.device[device] = state === '开'

  }
}
