import React from 'react'
import Link from 'next/link'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import AgendaProvider from './context/AgendaContext'
import List from './List/List'

function Main() {
  return (
    <AgendaProvider>
      <List/>
    </AgendaProvider>
  )
}

export default Main