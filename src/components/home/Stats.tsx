import { Users, BookOpen, Star, Briefcase } from 'lucide-react'
import { store } from '@/lib/store'

const icons = [Users, BookOpen, Star, Briefcase]
const iconColors = ['text-brand-green', 'text-brand-yellow', 'text-brand-green', 'text-brand-yellow']
const iconBgs = ['bg-brand-green/20', 'bg-brand-yellow/20', 'bg-brand-green/20', 'bg-brand-yellow/20']
const numberColors = ['text-brand-green', 'text-brand-yellow', 'text-brand-green', 'text-brand-yellow']

export default function Stats() {
  const settings = store.settings.get()
  const stats = settings.stats ?? []

  return (
    <section className="relative bg-navy-900 py-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className={`w-10 h-10 ${iconBgs[i % iconBgs.length]} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-5 h-5 ${iconColors[i % iconColors.length]}`} />
                </div>
                <div className={`text-4xl lg:text-5xl font-black ${numberColors[i % numberColors.length]} mb-2 leading-none`}>
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm leading-snug max-w-[140px]">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
