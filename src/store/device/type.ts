export enum MQTT {
  MQTT_PUB_TEMP = 'MQTT_PUB_TEMP',
  MQTT_PUB_HUM = 'MQTT_PUB_HUM',
  MQTT_PUB_MQ4 = 'MQTT_PUB_MQ4',
  MQTT_PUB_Bh1750 = 'MQTT_PUB_Bh1750',
  MQTT_PUB_HCSR501 = 'MQTT_PUB_HCSR501',
}
export const esp32_JDQ = 'esp32_JDQ'

export interface SensorType{
  MQTT_PUB_TEMP:SensorItemType
  MQTT_PUB_HUM:SensorItemType
  MQTT_PUB_MQ4:SensorItemType
  MQTT_PUB_Bh1750:SensorItemType
  MQTT_PUB_HCSR501:SensorItemType
}

export interface SensorItemType {
  name: string
  value:string
  img:string
  unit:string
}

