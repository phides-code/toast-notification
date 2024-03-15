import styled from 'styled-components';
import { ToastNotification, ToastNotificationType } from './types';
import TriggerButton from './TriggerButton';

interface CardProps {
    isMobile: boolean;
}

const Card = ({ isMobile }: CardProps) => {
    const notificationTypes: ToastNotificationType[] = Object.keys(
        ToastNotification
    ) as ToastNotificationType[];

    const mobile = isMobile.toString();

    return (
        <Wrapper $mobile={mobile}>
            {notificationTypes.map((notificationType) => (
                <TriggerButton
                    notificationType={notificationType}
                    key={notificationType}
                />
            ))}
        </Wrapper>
    );
};

interface StyledComponentProps {
    $mobile: string;
}

const Wrapper = styled.div<StyledComponentProps>`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100%;
    max-width: 20rem;
    border-radius: 8px;
    box-shadow: 0px 4px 4px 0px #00000040;

    margin: ${(props) => (props.$mobile === 'true' ? '0 0.5rem' : '0 5rem')};
    padding: ${(props) =>
        props.$mobile === 'true' ? '0.5rem 1rem' : '2rem 4rem'};
`;

export default Card;
