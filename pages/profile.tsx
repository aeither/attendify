import Layout from '@/components/layout/layout'
import { useAccount } from '@/lib/hooks/use-polybase'
import { useStore } from '@/lib/store'
import { genKeys } from '@/lib/utils/encrypt'
import { Avatar, Button, Input, Typography } from '@mui/material'
import { encodeToString } from '@polybase/util'
import { useState } from 'react'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'

export default function Profile() {
  const { updateName, updateEncryptPubKey, name, address } = useAccount()
  const [encryptionPrivKey, setEncryptionPrivKey] = useState<Uint8Array>()
  const setDecryptKey = useStore((state) => state.setDecryptKey)

  return (
    <>
      <Layout>
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

        <Button
          onClick={async (data) => {
            const { publicKey, privateKey } = await genKeys()
            setDecryptKey(encodeToString(privateKey, 'hex'))
            setEncryptionPrivKey(privateKey)

            updateEncryptPubKey(publicKey)
          }}
          variant="contained"
          color="secondary"
          type="submit"
        >
          Generate Encryption Key
        </Button>
        {encryptionPrivKey && (
          <>
            <Typography variant="h4">
              Please save this encryptation private key securely. Do not share with
              anyone.
            </Typography>
            <div className="flex w-full gap-2">
              <Input
                sx={{
                  wordBreak: 'break-all',
                }}
                fullWidth
                disabled
                defaultValue={encodeToString(encryptionPrivKey, 'hex')}
              />
              {/* <IconButton>
                <Clipboard />
              </IconButton> */}
            </div>
          </>
        )}

        {/* <Button onClick={() => deleteAccount()} variant="contained">
              Delete account
            </Button> */}
      </Layout>
    </>
  )
}
