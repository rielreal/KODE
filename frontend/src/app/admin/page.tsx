'use client'

import { useState, useEffect } from 'react'
import MenuDay from '@/components/MenuDay'
import Popup from '@/components/Popup'

interface Item {
  name: string
  price: number
}

interface Menu {
  day: string
  items: Item[]
  dessert?: Item
}

export default function AdminPage() {
  const [weekMenu, setWeekMenu] = useState<Menu[]>([
    { day: 'Mandag', items: [] },
    { day: 'Tirsdag', items: [] },
    { day: 'Onsdag', items: [] },
    { day: 'Torsdag', items: [] },
    { day: 'Fredag', items: [] }
  ])
  const [loading, setLoading] = useState(true)
  const [weekNumber, setWeekNumber] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  useEffect(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const week = Math.ceil((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000))
    setWeekNumber(week)

    fetch('/api/admin/menu')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setWeekMenu(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    try {
      await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weekMenu)
      })
      setModalMessage('Menyen er lagret!')
      setModalOpen(true)
    } catch (err) {
      setModalMessage('Kunne ikke lagre menyen')
      setModalOpen(true)
    }
  }

  const handleClear = async () => {
    const emptyMenu = [
      { day: 'Mandag', items: [] },
      { day: 'Tirsdag', items: [] },
      { day: 'Onsdag', items: [] },
      { day: 'Torsdag', items: [] },
      { day: 'Fredag', items: [] }
    ]
    setWeekMenu(emptyMenu)

    try {
      await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emptyMenu)
      })
      setModalMessage('Menyen er tømt!')
    } catch (err) {
      setModalMessage('Kunne ikke tømme menyen')
    }
    setModalOpen(true)
  }

  const updateDay = (i: number, updated: Menu) => {
    const menu = [...weekMenu]
    menu[i] = updated
    setWeekMenu(menu)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Laster...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#004E64] text-white py-8 mb-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Admin - Kantinmeny</h1>
          <p className="text-blue-100 text-lg">Administrer ukens meny</p>
          <p className="text-sm mt-2 opacity-80">Uke {weekNumber}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-5">
          {weekMenu.map((day, i) => (
            <MenuDay
              key={day.day}
              day={day}
              isFriday={day.day === 'Fredag'}
              onUpdate={(updated) => updateDay(i, updated)}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-8 flex justify-center gap-4">
          <button
            onClick={handleClear}
            className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            Tøm Alt
          </button>
          <button
            onClick={handleSave}
            className="bg-[#C85A3C] text-white px-10 py-3 rounded-lg font-semibold hover:bg-[#B04A2C] transition-colors"
          >
            Lagre Meny
          </button>
        </div>
      </div>

      <Popup
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
      />
    </div>
  )
}
