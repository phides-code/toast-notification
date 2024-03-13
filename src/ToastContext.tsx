import { ReactNode, createContext, useState } from 'react';
import { ToastNotificationMessage } from './types';

interface ToastsState {
    toasts: ToastNotificationMessage[];
    setToasts: React.Dispatch<React.SetStateAction<ToastNotificationMessage[]>>;
}

const ToastsContext = createContext<ToastsState>({
    toasts: [],
    setToasts: () => {},
});

interface ToastProviderProps {
    children: ReactNode;
}

const ToastsProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<ToastNotificationMessage[]>([]);

    const ToastsProviderValue: ToastsState = {
        toasts,
        setToasts,
    };

    return (
        <ToastsContext.Provider value={ToastsProviderValue}>
            {children}
        </ToastsContext.Provider>
    );
};

export { ToastsContext, ToastsProvider };
