/* eslint-disable guard-for-in */
/* eslint-disable no-console */
import axios from 'axios'
import React, { useState, useEffect } from 'react'

import {
  Pattern, HexGrid, Layout, Hexagon, Text, HexUtils, Hex,
} from 'react-hexgrid'
import TextBox from './subcomponents/TextBox'

const GameBoard = ({ setCurrentUsername, currentUsername }) => {
  const [hexagons, setHexagons] = useState({})
  const [gameName, setGameName] = useState('')
  const [count, setCount] = useState(0)

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

  const updateState = async () => {
    const { data } = await axios.get('/account/currentLogin')
    setCurrentUsername(data)
    const { data: data2 } = await axios.post('/gamestate/find', { name: gameName })
    setHexagons(data2.board)
  }

  useEffect(() => {
    updateState()
  }, [])

  return (
    <div className="grid grid-cols-1 py-2 px-3 px-16 App">
      <button onClick={() => {
        setCount(count + 1)
      }}
      >
        {' '}
        Refresh
      </button>
      <br />
      <TextBox backgroundName="gameName" setText={setGameName} text={gameName} />
      <br />
      <button onClick={async () => {
        const { data: data2 } = await axios.post('/gamestate/find', { name: gameName })
        setHexagons(data2.board)
      }}
      >
        {' '}
        Load Game
        {' '}

      </button>
      <label>
        {' '}
        {currentUsername}
        {' '}
      </label>
      <HexGrid width={1000} height={1000}>
        <Layout size={{ x: 3, y: 3 }} flat={false} spacing={1.02} origin={{ x: 0, y: 0 }}>
          { (hexagons)
            ? Object.keys(hexagons).map(tuple => {
              const hex = convertTupleToHex(tuple)
              return (
                <Hexagon
                  key={`${hex.q}${hex.r}${hex.s}`}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                  fill={hexagons[tuple].color}
                  onClick={async () => {
                    const temp = hexagons
                    temp[tuple].color = 'red'
                    setCount(count + 1)
                  }}
                />
              )
            })
            : null}
          {initializePatterns()}
        </Layout>
      </HexGrid>
    </div>
  )
}

export default GameBoard
