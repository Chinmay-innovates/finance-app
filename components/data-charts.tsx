'use client'

import { useGetsummary } from "@/features/summary/api/use-get-summary"
import { Chart, ChartLoadingSkeleton } from "@/components/chart";
import { SpendingPie, SpendingPieSkeleton } from "@/components/spending-pie";

export const DataCharts = () => {
  const { data, isLoading } = useGetsummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoadingSkeleton />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <SpendingPieSkeleton />
        </div>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data?.categories} />
      </div>
    </div>

  )
}