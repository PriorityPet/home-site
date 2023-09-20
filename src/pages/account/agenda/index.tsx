import Layout from '@/presentation/components/core/Layout'
import Main from '@/presentation/components/account/Agenda/Main'
import React from 'react'
import AccountLayout from '@/presentation/components/account/AccountLayout'

function Index() {
  return (
    <Layout title='Mi agenda'>
      <AccountLayout title='Mi agenda' description='Todas las reservaciones a servicios que tengas en Priority Pet'>
        <Main/>
      </AccountLayout>
    </Layout>
  )
}

export default Index