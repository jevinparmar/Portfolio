import { useState, useRef, useEffect } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface FormFieldProps {
  number: string
  label: string
  placeholder?: string
  registration: UseFormRegisterReturn
  type?: string
  isTextarea?: boolean
  error?: string
  disabled?: boolean
  autoFocus?: boolean
}

export function FormField({
  number,
  label,
  placeholder,
  registration,
  type = 'text',
  isTextarea = false,
  error,
  disabled = false,
  autoFocus = false,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasValue(e.target.value.length > 0)
    // Auto-grow textarea height
    if (isTextarea && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.max(80, textareaRef.current.scrollHeight)}px`
    }
  }

  useEffect(() => {
    if (isTextarea && textareaRef.current) {
      textareaRef.current.style.height = '80px'
    }
  }, [isTextarea])

  const isFloating = isFocused || hasValue

  return (
    <div className="contact-form-field relative pt-6 pb-2 group transition-colors">
      <div className="relative">
        {/* Floating Label with Number */}
        <label
          htmlFor={registration.name}
          className={`absolute left-0 transition-all duration-300 pointer-events-none select-none font-sans ${
            isFloating
              ? '-top-4 text-xs font-mono uppercase tracking-wider text-[#a855f7]'
              : 'top-2 text-lg sm:text-xl text-[#8c8c88] group-hover:text-[#f2f0eb]'
          }`}
        >
          <span className="font-mono text-xs mr-2 text-[#a855f7] font-semibold">{number}</span>
          <span>{label}</span>
        </label>

        {isTextarea ? (
          <textarea
            id={registration.name}
            {...registration}
            ref={(e) => {
              registration.ref(e)
              textareaRef.current = e
            }}
            rows={2}
            disabled={disabled}
            data-cursor="text"
            placeholder={isFloating ? placeholder : ''}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              registration.onBlur(e)
              setIsFocused(false)
              setHasValue(e.target.value.length > 0)
            }}
            onChange={(e) => {
              registration.onChange(e)
              handleInput(e)
            }}
            className="w-full bg-transparent text-[#f2f0eb] font-sans text-base sm:text-lg focus:outline-hidden resize-none overflow-hidden transition-all pt-2 pb-1"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${registration.name}-error` : undefined}
          />
        ) : (
          <input
            id={registration.name}
            type={type}
            {...registration}
            autoFocus={autoFocus}
            disabled={disabled}
            data-cursor="text"
            placeholder={isFloating ? placeholder : ''}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              registration.onBlur(e)
              setIsFocused(false)
              setHasValue(e.target.value.length > 0)
            }}
            onChange={(e) => {
              registration.onChange(e)
              handleInput(e)
            }}
            className="w-full bg-transparent text-[#f2f0eb] font-sans text-base sm:text-lg focus:outline-hidden transition-all pt-2 pb-1"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${registration.name}-error` : undefined}
          />
        )}

        {/* Static 1px hairline bottom separator */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />

        {/* Animated Accent Line that expands from left on focus */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#a855f7] origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isFocused ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>

      {/* Inline Sliding Error Message */}
      {error && (
        <div
          id={`${registration.name}-error`}
          role="alert"
          aria-live="polite"
          className="mt-1.5 font-mono text-xs text-red-400 flex items-center gap-1.5 animate-fadeIn"
        >
          <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
