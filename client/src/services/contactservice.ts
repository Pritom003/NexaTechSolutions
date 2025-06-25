// import { getValidToken } from "../../lib/verifyToken";
import emailjs from '@emailjs/browser';

// import emailjs from '@emailjs/browser'

const API_BASE = 'https://nexa-tech-server.vercel.app/api/v1/contacts'

export interface ContactData {
  name: string
  email: string
  subject: string
  message: string
    createdAt?: string
}

export const sendContactMessage = async (data: ContactData): Promise<void> => {
  // Save to backend
  const res = await fetch(`${API_BASE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error('Backend save failed:', errorText)
    throw new Error('Failed to submit contact form to backend')
  }

  // Send Email via EmailJS
  try {
    const emailResult = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      { ...data },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
    console.log('Email sent:', emailResult.status)
  } catch (err) {
    console.error('EmailJS failed:', err)
    throw new Error('Email delivery failed')
  }
}


export const getAllContacts = async (): Promise<ContactData[]> => {
  try {
    const res = await fetch('https://nexa-tech-server.vercel.app/api/v1/contacts', {
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to fetch contacts')
    }
    return data.data
  } catch (error) {
    console.error('Contact fetch error:', error)
    throw error
  }
}

