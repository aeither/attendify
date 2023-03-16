import { QrScanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import QRCode from 'react-qr-code'

export default function Home() {
  const [url, setUrl] = useState('')

  return (
    <>
      <FormContainer
        defaultValues={{ name: '' }}
        onSuccess={(data) => {
          console.log(data)
          setUrl(data.name)
        }}
      >
        <TextFieldElement name="name" label="Name" required />
      </FormContainer>
      <div className="flex w-32">
        <QRCode style={{ height: 'auto', maxWidth: '100%', width: '100%' }} value={url} />
      </div>
      <div className="flex max-w-xs">
        <QrScanner
          onDecode={(result) => console.log(result)}
          onError={(error) => console.log(error?.message)}
        />
      </div>
    </>
  )
}
