import classNames from "classnames";

const Spinner = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export const Button = ({
  isLoading,
  variant,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}) => {
  return (
    <button
      //   style={{ width: "100px" }}
      className={classNames(
        "border-gray-800 bg-gray-800 border-2 p-3 w-64 h-20",
        {
          "bg-gray-600 text-gray-500": props.disabled || isLoading,
        },
        { "bg-transparent": variant === "secondary" }
      )}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
