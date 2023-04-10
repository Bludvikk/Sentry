import React from 'react'
import { api } from '~/utils/api'

function sales() {

    const { data: salesData } = api.sales.list.useQuery()
    console.log(salesData)
    console.log('zzz')

    {salesData && salesData.map( row => {
        console.log(typeof row.grossAmount, row.grossAmount)
      })}
  return (
    
    <div>sales


    </div>
  )
}

export default sales