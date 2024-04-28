import { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { convertFileToUrl } from "@/lib/utils"
import { Button } from "../ui"

type AvatarUploaderProps = {
  fieldChange: (files: File[]) => void
  avatarUrl: string
}

const AvatarUploader = ({ fieldChange, avatarUrl }: AvatarUploaderProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState<string>(avatarUrl)

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles)
      fieldChange(acceptedFiles)
      setFileUrl(convertFileToUrl(acceptedFiles[0]))
    },
    [file]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  })

  return (
    <div className="flex items-center gap-4">
      <div {...getRootProps()}>
        <input {...getInputProps()} className="cursor-pointer" />

        <div className="cursor-pointer flex items-center gap-4">
          <img
            src={fileUrl}
            alt="image"
            className="h-20 w-20 rounded-full object-cover object-top"
          />
          <Button type="button" variant="secondary" size="sm">
            Change picture
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AvatarUploader
