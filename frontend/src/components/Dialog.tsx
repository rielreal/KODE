interface Props {
  isOpen: boolean
  onClose: () => void
  message: string
}

export default function Dialog({ isOpen, onClose, message }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 animate-slideUp">
        <p className="text-gray-800 text-lg mb-4">{message}</p>
        <button onClick={onClose} className="bg-[#C85A3C] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#B04A2C] w-full transition-colors">
          OK
        </button>
      </div>
    </div>
  )
}
