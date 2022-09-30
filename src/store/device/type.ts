export interface DeviceType {
  fan: boolean
  curtain: boolean
  humidifier: boolean
  access: boolean
}

export interface DeviceMatchType {
  name: string
  status: boolean
  icon: string
}

export enum MQTT {
  MQTT_PUB_TEMP = 'MQTT_PUB_TEMP',
  MQTT_PUB_HUM = 'MQTT_PUB_HUM',
  MQTT_PUB_MQ4 = 'MQTT_PUB_MQ4',
  MQTT_PUB_Bh1750 = 'MQTT_PUB_Bh1750',
  MQTT_PUB_HCSR501 = 'MQTT_PUB_HCSR501',
}

export const LinkageMap = {
  温度: 'MQTT_PUB_TEMP',
  湿度: 'MQTT_PUB_HUM',
  光照: 'MQTT_PUB_Bh1750',
  燃气: 'MQTT_PUB_MQ4',
  人体红外: 'MQTT_PUB_HCSR501',
}

export const DeviceMatchSend = {
  fan:1,
  curtain:2,
  humidifier:3,
  access:4
}

export const DEVICE = {
  fan: '风扇',
  curtain: '窗帘',
  humidifier: '加湿器',
  access: '门禁',
}

export const DEVICE_AGAINST = {
  风扇: 'fan',
  窗帘: 'curtain',
  加湿器: 'humidifier',
  门禁: 'access',
}
export const esp32_JDQ = 'esp32_JDQ'

export interface SensorType {
  MQTT_PUB_TEMP: SensorItemType
  MQTT_PUB_HUM: SensorItemType
  MQTT_PUB_MQ4: SensorItemType
  MQTT_PUB_Bh1750: SensorItemType
  MQTT_PUB_HCSR501: SensorItemType
}

export interface SensorItemType {
  name: string
  value: string
  img: string
  unit: string
}
