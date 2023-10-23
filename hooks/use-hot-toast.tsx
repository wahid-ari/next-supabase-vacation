import toast from 'react-hot-toast';

type PushProps = {
  message: string;
  isError?: boolean;
  isLoading?: boolean;
};

type UpdateProps = {
  toastId: any;
  message: string;
  isError?: boolean;
};

// TODO Docs https://github.com/timolins/react-hot-toast/issues/110
export default function useToast() {
  const pushToast = ({ message, isError, isLoading }: PushProps) => {
    if (!isError && !isLoading) {
      toast.success(<span className='font-medium'>{message}</span>, {
        duration: 4000,
        position: 'top-right',
        style: {
          maxWidth: 380,
          fontSize: '13px',
        },
      });
    } else if (!isLoading) {
      toast.error(<span className='font-medium'>{message}</span>, {
        id: message,
        duration: 4000,
        position: 'top-right',
        style: {
          maxWidth: 380,
          fontSize: '13px',
        },
      });
    } else {
      return toast.loading(<span className='font-medium'>{message}</span>, {
        position: 'top-right',
        style: {
          maxWidth: 380,
          fontSize: '13px',
        },
      });
    }
  };

  const updateToast = ({ toastId, message, isError }: UpdateProps) => {
    if (!isError) {
      toast.success(<span className='font-medium'>{message}</span>, {
        id: toastId,
        duration: 4000,
        position: 'top-right',
        style: {
          maxWidth: 380,
          fontSize: '13px',
        },
      });
    } else {
      toast.error(<span className='font-medium'>{message}</span>, {
        id: toastId,
        duration: 4000,
        position: 'top-right',
        style: {
          maxWidth: 380,
          fontSize: '13px',
        },
      });
    }
  };

  const dismissToast = () => {
    toast.dismiss();
  };

  return { updateToast, pushToast, dismissToast };
}
