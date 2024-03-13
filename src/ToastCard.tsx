import styled from 'styled-components';
import { ToastNotification, ToastNotificationMessage } from './types';
import { forwardRef, useContext } from 'react';
import { ToastsContext } from './ToastContext';

interface ToastCardProps {
    toast: ToastNotificationMessage;
}

const ToastCard = forwardRef<HTMLDivElement, ToastCardProps>(
    ({ toast }, ref) => {
        const { setToasts } = useContext(ToastsContext);

        const color = ToastNotification[toast.notificationType];

        const handleClose = () => {
            setToasts((currentToasts: ToastNotificationMessage[]) =>
                currentToasts.filter(
                    (currentToast) => currentToast.id !== toast.id
                )
            );
        };

        return (
            <Wrapper ref={ref} style={{ borderBottom: `3px solid ${color}` }}>
                <ToastContent>
                    <ToastIcon src={`/${toast.notificationType}.png`} />
                    <ToastMessage>{toast.message}</ToastMessage>
                </ToastContent>
                <CloseIcon src='close.png' onClick={handleClose} />
            </Wrapper>
        );
    }
);
const Wrapper = styled.div`
    display: flex;
    height: 3rem;
    width: 12rem;
    align-items: center;
    justify-content: space-between;
    margin: 0.4rem 0;
    background-color: white;
    border-radius: 10px;
    position: relative;
`;

const ToastContent = styled.div`
    display: flex;
`;

const ToastIcon = styled.img`
    height: 1rem;
    margin: 0 0.5rem 0 1rem;
    padding: 0.25rem 0 0;
`;

const ToastMessage = styled.div``;
const CloseIcon = styled.img`
    height: 1rem;
    margin: 0 1rem;
    border-radius: 5px;
    &:hover {
        border: 1px solid grey;
    }
`;

export default ToastCard;
