import { useState } from 'react'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import QRCode from 'react-qr-code'
import Layout from '@/components/layout/layout'

export default function Home() {
  const [url, setUrl] = useState('')

  return (
    <>
      <Layout>
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
          <QRCode
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={url}
          />
        </div>
      </Layout>
    </>
  )
}
