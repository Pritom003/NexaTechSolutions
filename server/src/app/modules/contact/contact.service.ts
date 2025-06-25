import { Contact, IContact } from './contact.models';



export const createContact = async (payload: IContact) => {
  const newContact = await Contact.create(payload)
  return newContact
}

export const getContacts = async () => {
  return Contact.find().sort({ createdAt: -1 })
}

export const getSingleContact = async (id: string) => {
  return Contact.findById(id)
}
