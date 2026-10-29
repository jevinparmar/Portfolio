interface PillSelectProps<T extends string> {
  label: string
  number: string
  options: readonly T[]
  value?: T
  onChange: (val: T) => void
  error?: string
}

export function PillSelect<T extends string>({
  label,
  number,
  options,
  value,
  onChange,
  error,
}: PillSelectProps<T>) {
  return (
    <div className="space-y-3 py-4 border-b border-white/10 group">
      <div className="flex items-center justify-between">
        <label className="font-mono text-xs uppercase tracking-wider text-[#8c8c88] flex items-center gap-2">
          <span className="text-[#a855f7] font-bold">{number}</span>
          <span>{label}</span>
        </label>
        {error && (
          <span
            role="alert"
            aria-live="polite"
            className="font-mono text-[11px] text-red-400 animate-fadeIn"
          >
            {error}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {options.map((opt) => {
          const isSelected = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              data-cursor="link"
              aria-pressed={isSelected}
              className={`rounded-full px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#a855f7] ${
                isSelected
                  ? 'bg-[#a855f7] text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-105'
                  : 'border border-white/10 bg-white/5 text-[#8c8c88] hover:border-[#a855f7]/40 hover:text-[#f2f0eb]'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
