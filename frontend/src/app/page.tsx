'use client'

import { useState, useEffect } from 'react'
import MenuCard from '@/components/MenuCard'

interface Item {
  name: string
  price: number
}

interface Menu {
  day: string
  items: Item[]
  dessert?: Item
}

export default function Home() {
  const [weekMenu, setWeekMenu] = useState<Menu[]>([])
  const [loading, setLoading] = useState(true)
  const [weekNumber, setWeekNumber] = useState(0)

  useEffect(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const week = Math.ceil((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000))
    setWeekNumber(week)

    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setWeekMenu(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Laster meny...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#004E64] text-white py-8 mb-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Ukens Meny</h1>
          <p className="text-[#5BA3C0] text-lg">Vågen Videregående Skole</p>
          <p className="text-sm mt-2 opacity-80">Uke {weekNumber}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {weekMenu.map((menu) => (
            <MenuCard
              key={menu.day}
              day={menu.day}
              items={menu.items}
              dessert={menu.dessert}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
