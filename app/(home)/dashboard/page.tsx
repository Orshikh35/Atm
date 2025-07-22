import React from 'react'
import StatusCards from './_components/status'
import DevicesChart from './_components/DeviceChart'
import LineChart from './_components/LineChart'
import RevenueByPeriod from './_components/RevenueByPeriod'
import WorldMap from './_components/WorldsMao'

function Page() {
  return (
    <div className=" text-white flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-6 text-orange-500">Нүүр хуудас</h1>
      <div className='flex w-full justify-between gap-6'>
        <StatusCards />
        <DevicesChart />
      </div>
      <div className="flex justify-between">
        <div className=" flex flex-col gap-6 w-1/3">
          <LineChart />
          <RevenueByPeriod />
        </div>
        <WorldMap />
      </div>
    </div>
  )
}

export default Page
