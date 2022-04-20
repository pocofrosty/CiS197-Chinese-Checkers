import React from 'react'
import axios from 'axios'
import Title from './subcomponents/Title'

const HomePage = ({ currentUsername }) => (
  <div>
    <label> Test </label>
    <Title text={currentUsername} />
    <button onClick={async () => {
      console.log(await axios.get('/account/currentLogin'))
    }}
    > Text </button > 
  </div>
)

export default HomePage
