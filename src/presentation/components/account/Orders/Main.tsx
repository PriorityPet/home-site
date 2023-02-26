import React from 'react'
import OrdersProvider from './context/OrdersContext'
import List from './List/List'
import Link from 'next/link'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

function Main() {
  return (
    <OrdersProvider>
      <List/>
    </OrdersProvider>
  )
}

export default Main