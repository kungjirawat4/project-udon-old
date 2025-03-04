import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

type FormErrorProps = {
  message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <ExclamationTriangleIcon className="size-4 flex-none" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
