'use client'

import { useState } from 'react'

interface Item {
  name: string
  price: number
}

interface Menu {
  day: string
  items: Item[]
  dessert?: Item
}

interface Props {
  day: Menu
  isFriday: boolean
  onUpdate: (day: Menu) => void
}

export default function MenuDay({ day, isFriday, onUpdate }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const addItem = () => onUpdate({ ...day, items: [...day.items, { name: '', price: 0 }] })

  const updateItem = (i: number, field: 'name' | 'price', value: string | number) => {
    const items = [...day.items]
    items[i] = { ...items[i], [field]: value }
    onUpdate({ ...day, items })
  }

  const deleteItem = (i: number) => onUpdate({ ...day, items: day.items.filter((_, idx) => idx !== i) })

  const updateDessert = (field: 'name' | 'price', value: string | number) =>
    onUpdate({ ...day, dessert: { ...day.dessert, [field]: value } as Item })

  const addDessert = () => onUpdate({ ...day, dessert: { name: '', price: 0 } })

  const removeDessert = () => onUpdate({ ...day, dessert: undefined })

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#C85A3C] p-4 text-white flex justify-between items-center hover:bg-[#B04A2C] transition-colors"
      >
        <h2 className="text-xl font-semibold">{day.day}</h2>
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Matretter</h3>
              <button
                onClick={addItem}
                className="bg-[#7DD3C0] text-white px-4 py-2 rounded-lg hover:bg-[#6BC2AF]"
              >
                + Legg til rett
              </button>
            </div>

            {day.items.map((item, i) => (
              <div key={i} className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg">
                <input
                  type="text"
                  placeholder="Navn på rett"
                  value={item.name}
                  onChange={(e) => updateItem(i, 'name', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C85A3C] focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Pris"
                  value={item.price || ''}
                  onChange={(e) => updateItem(i, 'price', parseFloat(e.target.value) || 0)}
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C85A3C] focus:border-transparent"
                />
                <span className="text-gray-600">kr</span>
                <button onClick={() => deleteItem(i)} className="text-red-500 hover:text-red-700 font-bold text-xl px-2">
                  ×
                </button>
              </div>
            ))}
          </div>

          {isFriday && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Dessert (ekstra)</h3>
                {!day.dessert && (
                  <button
                    onClick={addDessert}
                    className="bg-[#F4A261] text-white px-4 py-2 rounded-lg hover:bg-[#E8734E]"
                  >
                    + Legg til dessert
                  </button>
                )}
              </div>

              {day.dessert && (
                <div className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg">
                  <span className="text-2xl">🍰</span>
                  <input
                    type="text"
                    placeholder="Navn på dessert"
                    value={day.dessert.name}
                    onChange={(e) => updateDessert('name', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C85A3C] focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Pris"
                    value={day.dessert.price || ''}
                    onChange={(e) => updateDessert('price', parseFloat(e.target.value) || 0)}
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C85A3C] focus:border-transparent"
                  />
                  <span className="text-gray-600">kr</span>
                  <button
                    onClick={removeDessert}
                    className="text-red-500 hover:text-red-700 font-bold text-xl px-2"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
