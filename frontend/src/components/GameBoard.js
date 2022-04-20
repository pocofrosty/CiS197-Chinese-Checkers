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
      <Pattern id="red" size={{ x: 7.5, y: 8 }} link="https://github.com/pocofrosty/CiS-197-Final-Project/blob/main/frontend/assets/Forest-Test.JPG?raw=true" />
      <Pattern id="blue" size={{ x: 7.5, y: 8 }} link="https://github.com/pocofrosty/CiS-197-Final-Project/blob/main/frontend/assets/Wheat-Test.JPG?raw=true" />
      <Pattern id="green" size={{ x: 7.5, y: 8 }} link="https://github.com/pocofrosty/CiS-197-Final-Project/blob/main/frontend/assets/Sheep-Test.JPG?raw=true" />
      <Pattern id="orange" size={{ x: 7.5, y: 8 }} link="https://github.com/pocofrosty/CiS-197-Final-Project/blob/main/frontend/assets/Brick-Test.JPG?raw=true" />
      <Pattern id="yellow" size={{ x: 7.5, y: 8 }} link="https://github.com/pocofrosty/CiS-197-Final-Project/blob/main/frontend/assets/Ore-Test.JPG?raw=true" />
      <Pattern id="purple" size={{ x: 7.7, y: 8 }} link="https://github.com/pocofrosty/CiS-197-Final-Project/blob/main/frontend/assets/Desert-Test.JPG?raw=true" />
    </>
  )
  //   const hexagons = GridGenerator.hexagon(2)
  //   hexagons.push({ q: 1, r: 2, s: -3 })
  //   const HexagonData = {}
  //   hexagons.forEach((ele, idx) => {
  //     HexagonData[`(${ele.q},${ele.r},${ele.s})`] = {
  //       ID: ele.q + ele.r + ele.s,
  //     }
  //     console.log(`(${ele.q},${ele.r},${ele.s})`)
  //   })

  const convertTupleToHex = str => {
    const q = str.substring(str.indexOf('(') + 1, str.indexOf(','))
    console.log(q)
    const r = str.substring(str.indexOf(',') + 1, str.lastIndexOf(','))
    console.log(r)
    return new Hex(q, r, -q - r)
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
