import React from 'react'

import {
  Pattern, HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Hex,
} from 'react-hexgrid'

const GameBoard = () => {
  const HexagonData = {}

  for (let i = -4; i < 9; i++) {
    for (let j = -4; j < 5 - i; j++) {
      HexagonData[`(${i},${j},${-i - j})`] = 3
    }
  }
  for (let i = -8; i < 5; i++) {
    for (let j = -4 - i; j < 5; j++) {
      HexagonData[`(${i},${j},${-i - j})`] = 3
    }
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

  const convertTupleToHex = str => {
    const q = str.substring(str.indexOf('(') + 1, str.indexOf(','))
    const r = str.substring(str.indexOf(',') + 1, str.lastIndexOf(','))
    return new Hex(parseInt(q, 10), parseInt(r, 10), -parseInt(q, 10) - parseInt(r, 10))
  }

  return (
    <div className="App">
      <label> Test </label>
      <HexGrid width={1000} height={1000}>
        {initializePatterns()}
        <Layout size={{ x: 3, y: 3 }} flat={false} spacing={1.02} origin={{ x: 0, y: 0 }}>
          {
            Object.keys(HexagonData).map(tuple => {
              const hex = convertTupleToHex(tuple)
              return (
                <Hexagon
                  fill="red"
                  key={`${hex.q}${hex.r}${hex.s}`}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                >
                  <Text>
                    {HexUtils.getID(hex)}
                  </Text>
                </Hexagon>
              )
            })
        }
        </Layout>
      </HexGrid>
    </div>
  )
}

export default GameBoard
