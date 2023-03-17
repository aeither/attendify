import ScannerModal from '@/components/scanner-modal'
import { QrScanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
import { DateTimePickerElement, FormContainer, TextFieldElement } from 'react-hook-form-mui'
import QRCode from 'react-qr-code'

export default function Home() {
  return (
    <>
      <ScannerModal />

      <FormContainer
        defaultValues={{ name: '' }}
        onSuccess={(data) => {
          console.log(data)
        }}
      >
        <TextFieldElement name="name" label="Name" margin="normal" required />
        <DateTimePickerElement label="Datetime Picker" name="basic" />
      </FormContainer>
    </>
  )
}
