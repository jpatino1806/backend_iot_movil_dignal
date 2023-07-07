/**
 * Created by Dignal® for educational purposes. All rights reserved.
 */

'use strict'

global.functions = require('./utils')
require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const mqtt = require('mqtt')
const { Device, DeviceData } = require('./models')
const { isJson } = require('./utils')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

app.listen(process.env.PORT)

const httpServer = require('http').createServer()
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
})
httpServer.listen(process.env.WEBSOCKET_PORT)

const socketClient = io.on('connection', (socket) => {
  let roomId

  socket.on('init', (data) => {
    roomId = data
    socket.join(roomId)
  })

  socket.on('led', (status) => {
    mqttClient.publish(`/devices/${roomId}/led`, `{"led":${status}}`)
  })

  socket.on('disconnect', () => {
    socket.leave(roomId)
  })
})

const mqttClient = mqtt.connect(`mqtt://${process.env.MQTT_HOST}`, {
  username: ' ',
  password: process.env.MQTT_PASSWORD,
})

mqttClient.on('error', (error) => {
  console.log(error)
})

mqttClient.on('connect', () => {
  console.log('Successful connection to MQTT broker')
})

mqttClient.subscribe('/devices/+')

mqttClient.on('message', async (topic, payload) => {
  const key = topic.split('/')[2]
  const device = await Device.findOne({ where: { key } })

  if (null !== device && true === device.active && isJson(payload.toString())) {
    const parsedPayload = JSON.parse(payload.toString())
    if (undefined !== parsedPayload.temperature
      && undefined !== parsedPayload.light) {
      // {"temperature": 30, "light": 300}
      const {temperature, light} = parsedPayload

      console.log(`Temperatura: ${temperature}, Luz: ${light}`)

      await DeviceData.create({
        device_id: device.id,
        topic,
        data: payload.toString(),
      })

      socketClient.in(key).emit('temperature', {temperature})
      socketClient.in(key).emit('light', {light})
    }
  }
})
