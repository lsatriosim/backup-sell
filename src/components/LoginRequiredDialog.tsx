"use client"

import { useRouter } from "next/navigation"
import { CustomDialog } from "./CustomDialog" // adjust path if needed
import { Button } from "@/components/ui/button"

interface LoginRequiredDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginRequiredDialog({ open, onOpenChange }: LoginRequiredDialogProps) {
  const router = useRouter()

  return (
    <CustomDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Login Required"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false)
              router.push("/login?shouldBack=true")
            }}
          >
            Login
          </Button>
        </div>
      }
    >
      <p className="text-neutral-700 text-sm">
        You must log in to continue.
      </p>
    </CustomDialog>
  )
}
