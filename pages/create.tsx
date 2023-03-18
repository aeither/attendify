import DateFnsProvider from '@/components/layout/date-fns-provider'
import ScannerModal from '@/components/scanner-modal'
import { QrScanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
import {
  DateTimePickerElement,
  FormContainer,
  TextFieldElement,
} from 'react-hook-form-mui'
import QRCode from 'react-qr-code'

export default function Home() {
  return (
    <>
      <ScannerModal />
      <FormContainer
        defaultValues={{ name: '' }}
        onSuccess={(data, e) => {
          e?.preventDefault()

          console.log(data)
        }}
      >
        <TextFieldElement name="name" label="Name" margin="normal" required />
        <TextFieldElement
          name="description"
          label="Description"
          margin="normal"
          required
        />
        <DateTimePickerElement name="date" label="Datetime Picker" />
        <TextFieldElement name="name" label="Name" margin="normal" required />
      </FormContainer>
    </>
  )
}
