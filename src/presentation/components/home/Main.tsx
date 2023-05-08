import React from 'react'
import Header from './Header'
import Localities from './Localities'
import Specialists from './Specialists'
import Banner from './Banner'
import HeaderMobile from './HeaderMobile'

function Main() {
  return (
    <>
      <Header/>
      <HeaderMobile/>
      <Localities/>
      <Banner/>
      <Specialists/>
    </>
  )
}

export default Main