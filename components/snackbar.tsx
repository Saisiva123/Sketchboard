"use client"

import { TSnackbarProps } from "@/utils/snackbar.types";

export default function Snackbar({
  text,
  icon: Icon,
  handleClose,
  variant
}: TSnackbarProps) {
  const variants = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500"
  };
  return (
    <div className="absolute right-4 top-4 z-10">
      <div
        className={`${variants[variant]} flex gap-3 min-w-[320px] items-center truncate whitespace-nowrap rounded-lg py-3 px-3.5 text-xs text-white shadow-md`}
      >
        {Icon && (
          <span className="mr-1 text-base" aria-hidden="true">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <span>{text}</span>
        <button
          className="ml-auto bg-transparent !p-0 text-current underline"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
