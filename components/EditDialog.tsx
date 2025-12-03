import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  placeholder: string;
  initialValue?: string;
  onSubmit: (value: any) => void;
  isLoading?: boolean;
  secondaryLabel?: string;
  secondaryPlaceholder?: string;
  secondaryInitialValue?: string;
}

const EditDialog: React.FC<EditDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  placeholder,
  initialValue = "",
  onSubmit,
  isLoading = false,
  secondaryLabel,
  secondaryPlaceholder = "",
  secondaryInitialValue = "",
}) => {
  const [value, setValue] = useState(initialValue);
  const [secondaryValue, setSecondaryValue] = useState(secondaryInitialValue);

  // Reset value(s) when dialog opens with new initial values
  useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
      setSecondaryValue(secondaryInitialValue || "");
    }
  }, [isOpen, initialValue, secondaryInitialValue]);

  const handleSubmit = () => {
    if (secondaryLabel) {
      onSubmit({
        [secondaryLabel]: secondaryValue,
        ["Edit Instruction"]: value,
      });
    } else {
      onSubmit(value);
    }
  };

  const handleClose = () => {
    setValue(initialValue);
    setSecondaryValue(secondaryInitialValue || "");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-input" className="text-right">
              Edit Instruction
            </Label>
            <Textarea
              id="edit-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="col-span-3 border rounded-md p-2 text-sm resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-ring"
              rows={4}
            />
          </div>
          {secondaryLabel && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="secondary-input" className="text-right">
                {secondaryLabel} (Optional)
              </Label>
              <input
                id="secondary-input"
                value={secondaryValue}
                onChange={(e) => setSecondaryValue(e.target.value)}
                placeholder={secondaryPlaceholder}
                className="col-span-3 border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                type="text"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !value.trim() ||
              (secondaryLabel ? !secondaryValue.trim() : false)
            }
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
