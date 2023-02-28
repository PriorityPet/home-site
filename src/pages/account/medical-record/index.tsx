import Layout from '@/presentation/components/core/Layout'
import Main from '@/presentation/components/account/MedicalRecord/Main'
import React from 'react'
import AccountLayout from '@/presentation/components/account/AccountLayout'

function Index() {
  return (
    <Layout title='Expediente médico'>
      <AccountLayout title='Expediente médico' description='Todas las transacciones y compras que tengas en Medhaus'>
        <Main/>
      </AccountLayout>
    </Layout>
  )
}

export default Index