import AttestationTabs from '@/components/attestation-tabs'
import Layout from '@/components/layout/layout'
import ScannerModal from '@/components/scanner-modal'
import { useGivenAttestations, useReceivedAttestations } from '@/lib/hooks/use-atst'
import { usePBAccount } from '@/lib/hooks/use-polybase'
import { useStore } from '@/lib/store'
import { genKeys } from '@/lib/utils/encrypt'
import { Edit } from '@mui/icons-material'
import { Avatar, Button, Divider, Input, Stack, Typography } from '@mui/material'
import { encodeToString } from '@polybase/util'
import { useState } from 'react'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'

export default function Profile() {
  const { updateName, updateEncryptPubKey, name, address } = usePBAccount()
  const [encryptionPrivKey, setEncryptionPrivKey] = useState<Uint8Array>()
  const setDecryptKey = useStore((state) => state.setDecryptKey)
  const decryptKey = useStore((state) => state.decryptKey)
  const [editMode, setEditMode] = useState(false)

  const { data: recievedAts } = useReceivedAttestations(address)
  const { data: givenAts } = useGivenAttestations(address)

  if (!address) {
    return (
      <Layout>
        <div className="flex h-[50vh] w-full items-center justify-center text-center">
          <Typography variant="h2">Log in to see the content on this page.</Typography>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {address && name && (
        <>
          <div className="flex w-full flex-col gap-2 rounded-lg bg-neutral-800 p-4 ">
            <Avatar src="" className="mt-8" sx={{ width: 56, height: 56 }} />
            <Typography variant="h2">{name}</Typography>
            <Typography variant="body1" color={'text.secondary'}>
              {address.slice(0, 4) + '...' + address.slice(-4)}
            </Typography>

            <Stack
              className="underline"
              onClick={() => setEditMode(!editMode)}
              direction="row"
              justifyContent="start"
              alignItems="center"
              spacing={1}
            >
              <Edit sx={{ width: 16, height: 16, cursor: 'pointer' }} />
              <Typography className='cursor-pointer'>Edit Profile</Typography>
            </Stack>
            {editMode && (
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
            )}
          </div>
        </>
      )}

      <ScannerModal />

      <Divider />

      <Button
        fullWidth
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
        {!decryptKey ? 'Generate Encryption Key' : 'Regenerate Encryption Key'}
      </Button>

      {encryptionPrivKey && (
        <>
          <Typography variant="h4">
            Please save this encryptation private key securely. Do not share with anyone.
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

      <Divider />

      <AttestationTabs givenAts={givenAts} recievedAts={recievedAts} />

      {/* <Button onClick={() => deleteAccount()} variant="contained">
              Delete account
            </Button> */}
    </Layout>
  )
}
