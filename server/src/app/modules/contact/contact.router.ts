import express from 'express'
import * as contactController from './contact.controller'

const router = express.Router()

router.post('/', contactController.createContact)
router.get('/', contactController.getAllContacts)
// router.get('/:id', contactController.getSingleContact)

export const ContactRoutes = router
