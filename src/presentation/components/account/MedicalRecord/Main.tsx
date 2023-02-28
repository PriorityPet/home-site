import React from 'react'
import MedicalRecordProvider from './context/MedicalRecordContext'
import List from './List/List'
import Link from 'next/link'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

function Main() {
  return (
    <MedicalRecordProvider>
      <List/>
    </MedicalRecordProvider>
  )
}

export default Main