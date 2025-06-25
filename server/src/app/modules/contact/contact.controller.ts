import { Request, Response } from 'express'
import * as contactService from './contact.service'
import sendResponse from '../../utils/sendResponse'
import CatchAsync from '../../utils/fetch.async'
import mongoose from 'mongoose'
import emailjs from '@emailjs/nodejs'
import config from '../../config'

export const createContact = CatchAsync(async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body || {}

  if (!name || !email || !subject || !message) {
    res.status(400).json({
      success: false,
      message: 'All fields are required.',
    })
    return
  }

  // Try to send email first
  try {
    await emailjs.send(
      config.emailjs_service_id!,
      config.emailjs_template_id!,
      { name, email, subject, message },
      {
        publicKey: config.emailjs_public_key!,
        privateKey: config.emailjs_private_key!,
      }
    )
  } catch (err) {
    console.error('EmailJS Error:', err)
    // optionally continue or return here
  }

  const result = await contactService.createContact({ name, email, subject, message, createdAt: new Date() } as any)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Message sent and saved successfully',
    data: result,
  })
})

export const getAllContacts = CatchAsync(async (_req: Request, res: Response) => {
  const result = await contactService.getContacts()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contacts fetched successfully',
    data: result,
  })
})

// export const getSingleContact = CatchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ success: false, message: 'Invalid contact ID' })
//   }

//   const result = await contactService.getSingleContact(id)

//   if (!result) {
//     return res.status(404).json({ success: false, message: 'Contact not found' })
//   }

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Contact fetched successfully',
//     data: result,
//   })
// })
