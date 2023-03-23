import Button from '@mui/material/Button'
import { useStorageUpload } from '@thirdweb-dev/react'
import { ThirdwebStorage } from '@thirdweb-dev/storage'
import Image from 'next/image'
import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

interface UploadMusicProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UploadDropzone({ className, ...props }: UploadMusicProps) {
  const storage = new ThirdwebStorage()
  const { mutateAsync: upload, isLoading } = useStorageUpload()
  const { watch, setValue, unregister } = useFormContext()
  const hasImage = watch('image') // you can supply default value as second argument

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      const uris = await upload({ data: acceptedFiles })
      console.log(uris)

      const url = storage.resolveScheme(uris[0])
      setValue('image', url)
    },
    [upload],
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <>
      {hasImage ? (
        <div className="flex items-center gap-2">
          <Image className='rounded-lg' alt={'uploaded image'} width={120} height={120} src={hasImage} />
          <Button
            onClick={() => {
              setValue('image', undefined)
            }}
          >
            Remove Image
          </Button>
        </div>
      ) : (
        <div
          className="rounded border border-dashed border-neutral-500 p-4 hover:cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} disabled={isLoading} />
          <p className="text-neutral-500">
            {isLoading
              ? 'Uploading...'
              : 'Select or drop your image here to upload it to IPFS'}
          </p>
        </div>
      )}
    </>
  )
}
