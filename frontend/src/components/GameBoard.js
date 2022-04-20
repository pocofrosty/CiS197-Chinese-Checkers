/* eslint-disable guard-for-in */
/* eslint-disable no-console */
import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { io } from 'socket.io-client'

import {
  Pattern, HexGrid, Layout, Hexagon, Text, HexUtils, Hex,
} from 'react-hexgrid'

const GameBoard = ({ setCurrentUsername, currentUsername }) => {
  const [hexagons, setHexagons] = useState({})

  const updateState = async () => {
    const { data } = await axios.get('/account/currentLogin')
    setCurrentUsername(data)
    const { data: data2 } = await axios.get('/gamestate')
    setHexagons(data2)
  }

  useEffect(() => {
    updateState()
  }, [])

  const convertTupleToHex = str => {
    const q = str.substring(str.indexOf('(') + 1, str.indexOf(','))
    const r = str.substring(str.indexOf(',') + 1, str.lastIndexOf(','))
    return new Hex(parseInt(q, 10), parseInt(r, 10), -parseInt(q, 10) - parseInt(r, 10))
  }

  const initializeNewGame = () => {
    let hexagonData = {}

    for (let i = -4; i < 9; i++) {
      for (let j = -4; j < 5 - i; j++) {
        const tuple = `(${i},${j},${-i - j})`
        const temp = hexagonData
        temp[tuple] = { color: null }
        hexagonData = temp
      }
    }
    for (let i = -8; i < 5; i++) {
      for (let j = -4 - i; j < 5; j++) {
        const tuple = `(${i},${j},${-i - j})`
        const temp = hexagonData
        temp[tuple] = { color: null }
        hexagonData = temp
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const obj in hexagonData) {
      const temp = convertTupleToHex(obj)
      if (temp.r <= -5) {
        hexagonData[obj].color = 'red'
      } else if (temp.r >= 5) {
        hexagonData[obj].color = 'green'
      } else if (temp.q <= -5) {
        hexagonData[obj].color = 'blue'
      } else if (temp.q >= 5) {
        hexagonData[obj].color = 'yellow'
      } else if (temp.s <= -5) {
        hexagonData[obj].color = 'orange'
      } else if (temp.s >= 5) {
        hexagonData[obj].color = 'purple'
      }
    }

    return hexagonData
  }

  const temp = initializeNewGame()

  const initializePatterns = () => (
    <>
      <Pattern id="red" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/red-marble.PNG?raw=true" />
      <Pattern id="blue" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/blue-marble.PNG?raw=true" />
      <Pattern id="green" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/green-marble.PNG?raw=true" />
      <Pattern id="orange" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/orange-marble.PNG?raw=true" />
      <Pattern id="yellow" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/yellow-marble.PNG?raw=true" />
      <Pattern id="purple" size={{ x: 2.7, y: 3 }} link="https://github.com/pocofrosty/CiS197-Chinese-Checkers/blob/main/frontend/assets/purple-marble.PNG?raw=true" />
    </>
  )

  return (
    <div className="App">
      <button onClick={() => {
      }}
      >
        {`${currentUsername}I`}
      </button>
      <HexGrid width={1000} height={1000}>
        <Layout size={{ x: 3, y: 3 }} flat={false} spacing={1.02} origin={{ x: 0, y: 0 }}>
          {
            Object.keys(temp).map(tuple => {
              const hex = convertTupleToHex(tuple)
              return (
                <Hexagon
                  key={`${hex.q}${hex.r}${hex.s}`}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                  fill={temp[tuple].color}
                >
                  <Text>
                    {HexUtils.getID(hex)}
                  </Text>
                </Hexagon>
              )
            })
        }
          {initializePatterns()}
        </Layout>
      </HexGrid>
    </div>
  )
}

export default GameBoard
