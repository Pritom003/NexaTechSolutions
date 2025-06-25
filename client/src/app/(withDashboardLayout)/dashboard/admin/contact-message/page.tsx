'use client'

import { useEffect, useState } from 'react'
import { Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
// import { getAllContacts, Contact } from '@/services/contact.service'
import { ContactData, getAllContacts } from '@/services/contactservice'

const ContactMessageTable = () => {
  const [contacts, setContacts] = useState<ContactData[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const contactData = await getAllContacts()
        setContacts(contactData)
      } catch (err) {
        console.error('Error loading contacts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const columns: ColumnsType<ContactData> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
  ]

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Contact Messages</h2>
      <Table
        dataSource={contacts}
        columns={columns}
        loading={loading}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => {
            setSelectedContact(record)
            setIsModalOpen(true)
          },
        })}
        pagination={{ pageSize: 10 }}
        bordered
      />

      <Modal
        title="Contact Message Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedContact && (
          <div className="space-y-2">
            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Subject:</strong> {selectedContact.subject}</p>
            <p><strong>Message:</strong> {selectedContact.message}</p>
            <p><strong>Date:</strong> {selectedContact?.createdAt ? new Date(selectedContact.createdAt).toLocaleString() : 'N/A'}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ContactMessageTable
