import { CheckCircledIcon } from '@radix-ui/react-icons';

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <CheckCircledIcon className="size-4 flex-none" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
