import { Attest } from '@/components/attest'
import Layout from '@/components/layout/layout'
import { useAccount } from '@/lib/hooks/use-polybase'
import { Button, Typography } from '@mui/material'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'

export default function Profile() {
  const { updateName, deleteAccount } = useAccount()

  return (
    <>
      <Layout>
        <div className="flex gap-2 p-2">
          <Typography variant="h2">Auth</Typography>
          <FormContainer
            defaultValues={{ name: '' }}
            onSuccess={(data) => {
              console.log(data)
              updateName(data.name)
            }}
          >
            <TextFieldElement name="name" label="Name" margin="normal" required />
            <Button variant="contained" color="secondary" type="submit">
              Update record
            </Button>
          </FormContainer>

          {/* <Button onClick={() => deleteAccount()} variant="contained">
              Delete account
            </Button> */}
        </div>
        <Attest />
      </Layout>
    </>
  )
}
