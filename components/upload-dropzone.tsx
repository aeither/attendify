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
  const {watch, setValue } = useFormContext()
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
        <Image alt={'uploaded image'} width={40} height={40} src={hasImage} />
      ) : (
        <div
          className="rounded border border-dashed border-slate-500 p-4"
          {...getRootProps()}
        >
          <input {...getInputProps()} disabled={isLoading} />
          <p className="text-slate-500">
            {isLoading ? 'Uploading...' : 'Drop image here to upload them to IPFS'}
          </p>
        </div>
      )}
    </>
  )
}
