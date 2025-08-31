// src/components/TeamGrid.tsx
export default function TeamGrid() {
  const people = [
    { name: 'Amir Ahmed', role: 'Director', img: 'https://ifadaislamic.org/images/showcase-img/Ifada-amirs.JPG' },
    { name: 'Aisha Ali', role: 'Programs Lead', img: '/images/team2.jpg' },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {people.map(p => (
        <div key={p.name} className="bg-white rounded p-4 flex items-center gap-4 shadow">
          <img src={p.img} alt={p.name} className="h-16 w-16 object-cover rounded-full"/>
          <div>
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">{p.role}</div>
          </div>
        </div>
      ))}
    </div>
  )
}