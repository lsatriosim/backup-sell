"use client"

import { useRouter } from "next/navigation"
import { CustomDialog } from "./CustomDialog" // adjust path if needed
import { Button } from "@/components/ui/button"

interface DeleteConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onDeleteConfirm: () => void
}

export function DeleteConfirmationDialog({ open, onOpenChange, onDeleteConfirm }: DeleteConfirmationDialogProps) {
    return (
        <CustomDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Delete Confirmation"
            footer={
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onOpenChange(false)
                            onDeleteConfirm()
                        }}
                    >
                        Delete
                    </Button>
                </div>
            }
        >
            <p className="text-neutral-700 text-sm">
                Are you sure want to delete this post?
            </p>
        </CustomDialog>
    )
}
