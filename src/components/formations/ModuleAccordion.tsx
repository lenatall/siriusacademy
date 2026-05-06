'use client'

import { useState } from 'react'
import { ChevronDown, BookOpen, Clock } from 'lucide-react'
import type { Module } from '@/types'

interface ModuleAccordionProps {
  modules: Module[]
}

export default function ModuleAccordion({ modules }: ModuleAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {modules.map((module, index) => (
        <div
          key={module.id}
          className="border border-gray-200 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-navy-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h4 className="font-semibold text-navy-900 text-sm">{module.title}</h4>
                {module.lessons > 0 && (
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <BookOpen className="w-3 h-3" />
                      {module.lessons} leçons
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {module.duration}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-48' : 'max-h-0'
            }`}
          >
            <div className="px-5 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed">{module.description}</p>
              {module.lessons === 0 && (
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-brand-green font-medium bg-emerald-50 px-3 py-1 rounded-full">
                  <span>Projet encadré</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
