import type { ContactFormData } from './validation'

export interface SendMessageResponse {
  success: boolean
  message: string
}

const THROTTLE_DURATION_MS = 30000 // 30 seconds
const MIN_FILL_TIME_MS = 3000 // 3 seconds

export async function sendMessage(data: ContactFormData): Promise<SendMessageResponse> {
  // 1. Bot check: Honeypot must be empty
  if (data.honeypot && data.honeypot.length > 0) {
    throw new Error('Spam protection triggered. Submission rejected.')
  }

  // 2. Bot check: Time-based submission threshold (>= 3 seconds)
  const timeElapsed = Date.now() - (data.formStartTime || Date.now())
  if (timeElapsed < MIN_FILL_TIME_MS) {
    throw new Error('Submission completed too quickly. Please take a moment to review your message.')
  }

  // 3. Client-side throttle: 30 seconds between consecutive submissions
  const lastSubmit = localStorage.getItem('folio_contact_last_submit')
  if (lastSubmit) {
    const elapsedSinceLast = Date.now() - parseInt(lastSubmit, 10)
    if (elapsedSinceLast < THROTTLE_DURATION_MS) {
      const remainingSecs = Math.ceil((THROTTLE_DURATION_MS - elapsedSinceLast) / 1000)
      throw new Error(`Please wait ${remainingSecs}s before submitting another message.`)
    }
  }

  // 4. Delivery: check for Formspree endpoint or Web3Forms access key
  const formspreeEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

  const emailSubject = `Portfolio contact: ${data.name} (${data.projectType})`

  try {
    if (formspreeEndpoint) {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          projectType: data.projectType,
          budget: data.budget || 'Not specified',
          message: data.message,
          _subject: emailSubject,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to dispatch message via form service.')
      }
    } else if (web3FormsKey) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: data.name,
          email: data.email,
          subject: emailSubject,
          project_type: data.projectType,
          budget: data.budget || 'Not specified',
          message: data.message,
          from_name: 'Jevin Parmar Portfolio',
        }),
      })

      const result = await res.json()
      if (!result.success) {
        throw new Error(result.message || 'Service was unable to process message.')
      }
    } else {
      // Simulated delivery for local dev mode with helpful console guidance
      console.info(
        '%c[Contact Form API]%c Simulated transmission (Add VITE_WEB3FORMS_ACCESS_KEY or VITE_CONTACT_FORM_ENDPOINT in .env):',
        'color: #a855f7; font-weight: bold;',
        'color: inherit;',
        {
          name: data.name,
          email: data.email,
          subject: emailSubject,
          projectType: data.projectType,
          budget: data.budget,
          message: data.message,
        }
      )

      // Emulate network latency
      await new Promise((resolve) => setTimeout(resolve, 1200))
    }

    // Record submission timestamp for throttle
    localStorage.setItem('folio_contact_last_submit', Date.now().toString())

    return {
      success: true,
      message: "Message sent. I'll reply within 24-48h.",
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'An unexpected network error occurred.'
    throw new Error(errorMsg)
  }
}
