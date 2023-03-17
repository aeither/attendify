import { Attest } from '@/components/attest'
import Layout from '@/components/layout/layout'
import { useAccount } from '@/lib/hooks/use-polybase'
import { Avatar, Button, Typography } from '@mui/material'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'

export default function Profile() {
  const { updateName, deleteAccount, name, address } = useAccount()

  return (
    <>
      <Layout>
        <div className="flex w-full max-w-screen-sm flex-col items-center gap-2 p-4">
          {address && name && (
            <>
              <div className="flex w-full flex-col gap-2 p-4">
                <Avatar src="" className="mt-8" sx={{ width: 56, height: 56 }} />
                <Typography variant="h2">{name}</Typography>
                <Typography variant="body1" color={'text.secondary'}>
                  {address.slice(0, 4) + '...' + address.slice(-4)}
                </Typography>
              </div>
            </>
          )}
          <FormContainer
            defaultValues={{ name: '' }}
            onSuccess={(data) => {
              console.log(data)
              updateName(data.name)
            }}
          >
            <div className="flex w-full  flex-col gap-2 p-4">
              <TextFieldElement name="name" label="Name" margin="normal" required />
              <Button variant="contained" color="secondary" type="submit">
                Save
              </Button>
            </div>
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
