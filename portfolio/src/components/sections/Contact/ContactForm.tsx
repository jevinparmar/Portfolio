import { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, Check, AlertCircle, Loader2, RotateCcw } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../lib/gsap'
import {
  contactFormSchema,
  PROJECT_TYPES,
  BUDGET_TIERS,
} from '../../../lib/validation'
import type { ContactFormData } from '../../../lib/validation'
import { sendMessage } from '../../../lib/sendMessage'
import { FormField } from './FormField'
import { PillSelect } from './PillSelect'
import { Magnetic } from '../../motion/Magnetic'
import { SplitReveal } from '../../motion/SplitReveal'
import { DownloadCV } from '../../ui/DownloadCV'

export function ContactForm() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string>('')
  const [startTime, setStartTime] = useState<number>(Date.now())

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      projectType: 'Website',
      budget: '$5k - $15k',
      message: '',
      honeypot: '',
      formStartTime: Date.now(),
    },
  })

  // Stagger reveal on scroll
  useGSAP(() => {
    if (!containerRef.current) return

    const fields = containerRef.current.querySelectorAll('.contact-form-item')

    gsap.fromTo(
      fields,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: containerRef, dependencies: [formStatus] })

  useEffect(() => {
    setStartTime(Date.now())
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus('submitting')
    setServerError('')

    try {
      await sendMessage({
        ...data,
        formStartTime: startTime,
      })

      setFormStatus('success')

      // Celebratory burst
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#a855f7', '#c084fc', '#f2f0eb', '#7e22ce'],
      })
    } catch (err: unknown) {
      setFormStatus('error')
      const msg = err instanceof Error ? err.message : 'Failed to send message.'
      setServerError(msg)
    }
  }

  const handleReset = () => {
    reset()
    setFormStatus('idle')
    setServerError('')
    setStartTime(Date.now())
  }

  return (
    <div ref={containerRef} className="w-full">
      <AnimatePresence mode="wait">
        {formStatus === 'success' ? (
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="rounded-2xl border border-white/10 bg-[#121212]/90 p-8 sm:p-12 md:p-16 backdrop-blur-md flex flex-col justify-between min-h-[460px]"
            role="status"
            aria-live="polite"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7]">
                <Check className="w-6 h-6" />
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#a855f7] block mb-2">
                  // TRANSMISSION RECEIVED
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#f2f0eb] leading-tight mb-4">
                  <SplitReveal text="Message Dispatched." delay={0.1} />
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#8c8c88] max-w-lg leading-relaxed">
                  Thank you for reaching out. I personally review all incoming project inquiries and will reply within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleReset}
                data-cursor="link"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#a855f7] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Send Another Transmission</span>
              </button>

              <DownloadCV variant="button" />
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Hidden Honeypot Field for anti-spam */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('honeypot')}
              className="absolute opacity-0 pointer-events-none -z-10 h-0 w-0"
              aria-hidden="true"
            />

            {/* Error Banner if Server Fails */}
            {formStatus === 'error' && (
              <div
                role="alert"
                aria-live="polite"
                className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-mono text-red-400 flex items-start gap-3 animate-fadeIn"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-300">Message Delivery Interrupted</p>
                  <p className="mt-0.5 text-red-400/90">{serverError || 'Unable to connect to service. Please retry or contact directly via email.'}</p>
                </div>
              </div>
            )}

            {/* Field 01: Name */}
            <div className="contact-form-item">
              <FormField
                number="01"
                label="Your Name *"
                placeholder="Ada Lovelace"
                registration={register('name')}
                error={errors.name?.message}
                disabled={formStatus === 'submitting'}
              />
            </div>

            {/* Field 02: Email */}
            <div className="contact-form-item">
              <FormField
                number="02"
                label="Email Address *"
                placeholder="ada@example.com"
                type="email"
                registration={register('email')}
                error={errors.email?.message}
                disabled={formStatus === 'submitting'}
              />
            </div>

            {/* Field 03: Project Type (Custom Pill Selector) */}
            <div className="contact-form-item">
              <Controller
                name="projectType"
                control={control}
                render={({ field }) => (
                  <PillSelect
                    number="03"
                    label="What are you building?"
                    options={PROJECT_TYPES}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.projectType?.message}
                  />
                )}
              />
            </div>

            {/* Field 04: Budget Tier */}
            <div className="contact-form-item">
              <Controller
                name="budget"
                control={control}
                render={({ field }) => (
                  <PillSelect
                    number="04"
                    label="Estimated Budget (Optional)"
                    options={BUDGET_TIERS}
                    value={field.value as (typeof BUDGET_TIERS)[number]}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Field 05: Message (Auto-growing textarea) */}
            <div className="contact-form-item">
              <FormField
                number="05"
                label="Project Brief or Message *"
                placeholder="Briefly describe the vision, requirements, timeline, and goals..."
                isTextarea={true}
                registration={register('message')}
                error={errors.message?.message}
                disabled={formStatus === 'submitting'}
              />
            </div>

            {/* Form Actions */}
            <div className="contact-form-item pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <Magnetic strength={0.35} dataCursor="magnetic">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  data-cursor="link"
                  data-cursor-label="SEND"
                  className="group relative inline-flex items-center gap-4 rounded-full bg-[#a855f7] px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#c084fc] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-105 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-white"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0a0a0a]" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      {/* Text Roll Effect on Hover */}
                      <span className="relative overflow-hidden h-[16px] flex flex-col justify-start">
                        <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                          Send Message
                        </span>
                        <span className="absolute top-full left-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                          Launch Dispatch
                        </span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </Magnetic>

              {/* Download CV Feature (Placement C: under the form) */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#8c8c88] hidden md:inline">Or review credentials:</span>
                <DownloadCV variant="button" />
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
