"use client"

import { CustomDialog } from "@/components/CustomDialog"
import { Button } from "./ui/button"

interface BuyerInfoDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  ctaButtonDidTap: () => void
}

export default function BuyerInfoDialog({ open, setOpen, ctaButtonDidTap }: BuyerInfoDialogProps) {
  const buyerInfo = (
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
        By creating offer, you give seller access to contact your phone number
      </li>
      <li>
        Verify the{" "}
        <span className="font-medium">seller’s invoice</span> before
        sending any payment.
      </li>
      <li>
        Double-check that the{" "}
        <span className="font-medium">phone number is local & valid</span>{" "}
        (avoid suspicious foreign country codes).
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
      {buyerInfo}
    </CustomDialog>
  )
}
