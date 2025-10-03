interface Item {
  name: string
  price: number
}

interface Props {
  day: string
  items: Item[]
  dessert?: Item
}

export default function MenuCard({ day, items, dessert }: Props) {
  return (
    <div className="space-y-3">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#C85A3C] p-4">
          <h2 className="text-xl font-semibold text-white">{day}</h2>
        </div>
        <div className="p-5">
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex justify-between text-gray-500">
                <span>{item.name}</span>
                <span className="font-semibold text-[#003D52]">{item.price} kr</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {dessert && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#F4A261] p-3">
            <h3 className="text-sm font-semibold text-white">Dessert</h3>
          </div>
          <div className="p-4">
            <div className="flex justify-between text-gray-500">
              <span>🍰 {dessert.name}</span>
              <span className="font-semibold text-[#003D52]">{dessert.price} kr</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
