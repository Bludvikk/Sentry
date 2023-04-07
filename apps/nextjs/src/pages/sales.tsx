import React from 'react'
import { api } from '~/utils/api'

function sales() {

    const { data: salesData } = api.sales.list.useQuery()
    console.log(salesData?.sales)
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  return (

    <div>sales</div>
  )
}

export default sales