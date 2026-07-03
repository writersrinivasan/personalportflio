'use client'

import { useState } from 'react'

type FormData = {
  name: string
  email: string
  phone: string
  role: string
  message: string
  slot: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialForm: FormData = { name: '', email: '', phone: '', role: '', message: '', slot: '' }

// Validation rules
function validate(form: FormData): FormErrors {
  const errors: FormErrors = {}

  if (form.name.trim().length < 2)
    errors.name = 'Please enter your full name (at least 2 characters).'

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email address.'

  // Accept Indian (10-digit) and international formats
  const digits = form.phone.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15)
    errors.phone = 'Please enter a valid phone number.'

  if (!form.role)
    errors.role = 'Please select your profile so we can prepare for the call.'

  if (form.message.length > 500)
    errors.message = 'Please keep your message under 500 characters.'

  return errors
}

const inputBase =
  'w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all'
const inputOk = 'border-gray-200 focus:border-brand-violet focus:ring-orange-100'
const inputErr = 'border-red-400 focus:border-red-400 focus:ring-red-100 bg-red-50'

export default function BookingForm() {
  const [form, setForm]           = useState<FormData>(initialForm)
  const [errors, setErrors]       = useState<FormErrors>({})
  const [touched, setTouched]     = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [honeypot, setHoneypot]   = useState('')   // must stay empty — bots fill this
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Re-validate the field as soon as the user corrects it
    if (touched[name as keyof FormData]) {
      const next = { ...form, [name]: value }
      const errs = validate(next)
      setErrors(prev => ({ ...prev, [name]: errs[name as keyof FormData] }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    // Use the live input value, not the stale form snapshot from the current render
    const next = { ...form, [name]: value }
    const errs = validate(next)
    setErrors(prev => ({ ...prev, [name]: errs[name as keyof FormData] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')

    // Honeypot check — if a bot filled the hidden field, silently fake success
    if (honeypot) {
      setSubmitted(true)
      return
    }

    // Full validation pass on submit
    const errs = validate(form)
    setTouched({ name: true, email: true, phone: true, role: true, message: true, slot: true })
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Defer scroll until after React re-renders with the new aria-invalid attrs
      setTimeout(() => {
        document.querySelector('[aria-invalid="true"]')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 0)
      return
    }

    setLoading(true)
    try {
      // ── Wire to your form service here ──────────────────────────────────────
      // Option A — Formspree:
      //   const res = await fetch('https://formspree.io/f/YOUR_ID', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(form),
      //   })
      //   if (!res.ok) throw new Error('Submission failed')
      //
      // Option B — Netlify Forms: add data-netlify="true" to <form> tag
      // ────────────────────────────────────────────────────────────────────────

      // Placeholder: simulated 1.2s delay
      await new Promise(r => setTimeout(r, 1200))
      setSubmitted(true)
    } catch {
      setServerError('Something went wrong. Please try again or email writersrinivasan@gmail.com directly.')
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (field: keyof FormData) =>
    `${inputBase} ${touched[field] && errors[field] ? inputErr : inputOk}`

  const ariaProps = (field: keyof FormData) => ({
    'aria-invalid': (touched[field] && !!errors[field]) as boolean,
    'aria-describedby': touched[field] && errors[field] ? `${field}-err` : undefined,
  })

  return (
    <section id="book" className="bg-brand-gradient section-pad">
      <div className="max-w-4xl mx-auto">
        {!submitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
                FREE · NO OBLIGATION · 30 MINUTES
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
                Book your free<br />discovery call.
              </h2>
              <p className="text-white/70 text-lg font-light max-w-xl mx-auto">
                We&apos;ll talk about your goals, walk you through the course, and tell you exactly what the investment looks like. Zero pressure.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">

              {/* Honeypot — hidden from real users, bots fill it in */}
              <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
                <label htmlFor="f-website">Website</label>
                <input
                  id="f-website"
                  name="website"
                  type="text"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">

                {/* Name */}
                <div>
                  <label htmlFor="f-name" className="block text-xs font-bold text-gray-500 tracking-wide uppercase mb-2">
                    Full Name *
                  </label>
                  <input
                    id="f-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                    placeholder="Your full name"
                    minLength={2}
                    maxLength={100}
                    className={fieldClass('name')}
                    {...ariaProps('name')}
                  />
                  {touched.name && errors.name && (
                    <p id="name-err" role="alert" className="text-red-500 text-xs mt-1.5">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="f-email" className="block text-xs font-bold text-gray-500 tracking-wide uppercase mb-2">
                    Email *
                  </label>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    placeholder="your@email.com"
                    maxLength={254}
                    className={fieldClass('email')}
                    {...ariaProps('email')}
                  />
                  {touched.email && errors.email && (
                    <p id="email-err" role="alert" className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="f-phone" className="block text-xs font-bold text-gray-500 tracking-wide uppercase mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="f-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="tel"
                    placeholder="+91 00000 00000"
                    maxLength={20}
                    className={fieldClass('phone')}
                    {...ariaProps('phone')}
                  />
                  {touched.phone && errors.phone && (
                    <p id="phone-err" role="alert" className="text-red-500 text-xs mt-1.5">{errors.phone}</p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="f-role" className="block text-xs font-bold text-gray-500 tracking-wide uppercase mb-2">
                    I am a *
                  </label>
                  <select
                    id="f-role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${fieldClass('role')} bg-white text-gray-700`}
                    {...ariaProps('role')}
                  >
                    <option value="">Select your profile</option>
                    <option value="fresh-grad">Fresh Graduate (BE / BTech / BCA / BSc)</option>
                    <option value="career-switcher">Career Switcher — moving into AI</option>
                    <option value="working-professional">Working Professional — corporate / MNC</option>
                    <option value="entrepreneur">Entrepreneur / Founder</option>
                    <option value="other">Other</option>
                  </select>
                  {touched.role && errors.role && (
                    <p id="role-err" role="alert" className="text-red-500 text-xs mt-1.5">{errors.role}</p>
                  )}
                </div>

                {/* Time slot */}
                <div>
                  <label htmlFor="f-slot" className="block text-xs font-bold text-gray-500 tracking-wide uppercase mb-2">
                    Preferred Call Time
                  </label>
                  <select
                    id="f-slot"
                    name="slot"
                    value={form.slot}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${fieldClass('slot')} bg-white text-gray-700`}
                    {...ariaProps('slot')}
                  >
                    <option value="">Any time works</option>
                    <option value="morning">Morning (9 AM – 12 PM IST)</option>
                    <option value="afternoon">Afternoon (12 PM – 5 PM IST)</option>
                    <option value="evening">Evening (5 PM – 9 PM IST)</option>
                  </select>
                  {touched.slot && errors.slot && (
                    <p id="slot-err" role="alert" className="text-red-500 text-xs mt-1.5">{errors.slot}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="f-message" className="block text-xs font-bold text-gray-500 tracking-wide uppercase mb-2">
                    Your Goal <span className="text-gray-400 font-normal normal-case">(optional, max 500 chars)</span>
                  </label>
                  <textarea
                    id="f-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={3}
                    maxLength={500}
                    placeholder="What do you want to achieve with AI?"
                    className={`${fieldClass('message')} resize-none`}
                    {...ariaProps('message')}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {touched.message && errors.message
                      ? <p id="message-err" role="alert" className="text-red-500 text-xs">{errors.message}</p>
                      : <span />}
                    <span className={`text-xs ${form.message.length > 450 ? 'text-orange-500' : 'text-gray-400'}`}>
                      {form.message.length}/500
                    </span>
                  </div>
                </div>

              </div>

              {/* Server error */}
              {serverError && (
                <div role="alert" className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {serverError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-gradient hover:opacity-90 text-white font-bold py-4 rounded-xl text-base transition-all hover:shadow-xl hover:shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Booking your call…' : 'Book My Free Discovery Call →'}
              </button>
              <p className="text-center text-gray-400 text-xs mt-4">
                We&apos;ll reach out within 24 hours to confirm your slot. No spam, ever.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-extrabold text-white mb-4">You&apos;re booked!</h2>
            <p className="text-white/70 text-lg max-w-md mx-auto mb-8">
              We received your request. Srinivasan&apos;s team will reach out within 24 hours to confirm your free discovery call.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm(initialForm); setErrors({}); setTouched({}); setHoneypot('') }}
              className="bg-white text-brand-violet font-semibold px-6 py-3 rounded-full text-sm hover:shadow-xl transition-all"
            >
              Submit another request
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
