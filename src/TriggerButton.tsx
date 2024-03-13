import styled from 'styled-components';
import {
    ToastNotificationType,
    ToastNotificationMessage,
    ToastNotification,
    SampleMessages,
} from './types';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { ToastsContext } from './ToastContext';

interface TriggerButtonProps {
    notificationType: ToastNotificationType;
}

const TriggerButton = ({ notificationType }: TriggerButtonProps) => {
    const { setToasts } = useContext(ToastsContext);

    const handleClick = () => {
        const message = SampleMessages[notificationType];
        const id = uuidv4();
        setToasts((currentToasts: ToastNotificationMessage[]) =>
            currentToasts.concat({ id, message, notificationType })
        );

        // Remove the item after 3 seconds
        setTimeout(() => {
            setToasts((currentToasts: ToastNotificationMessage[]) =>
                currentToasts.filter((toast) => toast.id !== id)
            );
        }, 4000);
    };

    return (
        <StyledTriggerButton
            style={{
                backgroundColor: ToastNotification[notificationType],
            }}
            onClick={handleClick}
        >
            {notificationType}
        </StyledTriggerButton>
    );
};

const StyledTriggerButton = styled.button`
    width: 100%;
    padding: 1rem 0;
    margin: 0.5rem 0;
    border-radius: 10px;
    border: none;
    color: white;
    font-size: medium;
    &:hover {
        opacity: 0.8;
        font-weight: bold;
    }
`;

export default TriggerButton;
