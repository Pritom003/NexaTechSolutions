'use client'

import { sendContactMessage } from '@/services/contactservice'
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = formRef.current
    if (!form) return

    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement)?.value || '',
      email: (form.elements.namedItem('email') as HTMLInputElement)?.value || '',
      subject: (form.elements.namedItem('subject') as HTMLInputElement)?.value || '',
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '',
    }

    try {
      await sendContactMessage(formData)
      toast.success('📬 Message sent successfully!')
      form.reset()
    } catch (error) {
      console.error(error)
      toast.error('❌ Failed to send message. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white shadow-2xl mt-24 rounded-2xl w-full max-w-2xl p-8 md:p-10 border border-gray-200"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-700">📨 Contact Mailbox</h1>
          <p className="text-gray-500 mt-2">We’d love to hear from you!</p>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              required
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 "
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 "
            />
          </div>
          <input
            name="subject"
            placeholder="Subject"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 "
          />
          <textarea
            name="message"
            placeholder="Write your message..."
            rows={6}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 "
          />

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full bg-orange-600 text-white py-3 rounded-xl text-lg font-medium transition-all duration-300
               hover:bg-orange-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default ContactPage
