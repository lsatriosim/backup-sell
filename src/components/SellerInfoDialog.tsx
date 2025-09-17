"use client"

import { CustomDialog } from "@/components/CustomDialog"
import { Button } from "./ui/button"

interface SellerInfoDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  ctaButtonDidTap: () => void
}

export default function SellerInfoDialog({ open, setOpen, ctaButtonDidTap }: SellerInfoDialogProps) {
  const sellerInfo = (
    <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
      <li>
        Backup Sell only connects sellers and buyers. All payments and
        transactions happen outside of our responsibility.
      </li>
      <li>
        Keep the platform up to date by{" "}
        <span className="font-medium">
          updating your post/offer status
        </span>{" "}
        if you change your mind.
      </li>
      <li>
        Always provide a{" "}
        <span className="font-medium">valid invoice under your name</span>{" "}
        to buyers to build trust.
      </li>
      <li>
        Clearly mention court details, date/time, and price in your post.
      </li>
    </ul>
  )

  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      title="Disclaimer Info"
      footer={
        <div className="flex w-full justify-end">
          <Button
            variant="outline"
            onClick={() => ctaButtonDidTap()}
          >
            Continue
          </Button>
        </div>
      }
    >
      {sellerInfo}
    </CustomDialog>
  )
}
