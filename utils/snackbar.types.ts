export type SnackbarType = {
    key: string;
    text: React.ReactNode;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    variant: "success" | "error" | "warning" | "info";
};

export type TSnackbarProps = Omit<SnackbarType, "key"> & {
    handleClose: () => void;
    className?: string;
  };
  

type Success = "bg-green-500";
type Error = "bg-red-500";
type Warning = "bg-yellow-500";
type Info = "bg-blue-500";

type Variant = Success | Error | Warning | Info;
