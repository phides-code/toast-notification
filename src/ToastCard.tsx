import styled from 'styled-components';
import { ToastNotification, ToastNotificationMessage } from './types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ToastsContext } from './ToastContext';
import { motion, spring } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ToastCardProps {
    toast: ToastNotificationMessage;
}

const ToastLifeInMS = 4000;
const ProgressFrequency = 200;

const ToastCard = ({ toast }: ToastCardProps) => {
    const { setToasts } = useContext(ToastsContext);
    const [msRemaining, setMsRemaining] = useState<number>(ToastLifeInMS);
    const [pauseCountdown, setPausedCountdown] = useState<boolean>(false);

    const color = ToastNotification[toast.notificationType];

    const handleClose = useCallback(() => {
        setToasts((currentToasts: ToastNotificationMessage[]) =>
            currentToasts.filter((currentToast) => currentToast.id !== toast.id)
        );
    }, [setToasts, toast.id]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!pauseCountdown) {
                setMsRemaining(
                    (prevMsRemaining) => prevMsRemaining - ProgressFrequency
                );
            }
            if (msRemaining <= ProgressFrequency) {
                handleClose();
            }
        }, ProgressFrequency);

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [handleClose, msRemaining, pauseCountdown]);

    const handleMouseEnter = () => {
        setPausedCountdown(true);
    };

    const handleLeave = () => {
        setPausedCountdown(false);
    };

    const percentage = ((ToastLifeInMS - msRemaining) / ToastLifeInMS) * 100;

    return (
        <Wrapper
            $color={color}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleLeave}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
            layout={true}
            transition={{ spring }}
        >
            <ToastContent>
                <ToastIcon src={`/${toast.notificationType}.png`} />
                <ToastMessage>{toast.message}</ToastMessage>
            </ToastContent>

            <ProgressAndCloseArea>
                <ProgressPieContainer>
                    <CircularProgressbar
                        value={percentage}
                        strokeWidth={50}
                        styles={buildStyles({
                            strokeLinecap: 'butt',
                            pathColor: color,
                        })}
                    />
                </ProgressPieContainer>
                <CloseIcon src='close.png' onClick={handleClose} />
            </ProgressAndCloseArea>
        </Wrapper>
    );
};

interface StyledComponentProps {
    $color: string;
}

const Wrapper = styled(motion.div)<StyledComponentProps>`
    display: flex;
    height: 3rem;
    width: 12rem;
    align-items: center;
    justify-content: space-between;
    margin: 0.4rem 0;
    background-color: white;
    border-radius: 10px;

    border-bottom: ${(props) => `3px solid ${props.$color}`};

    &:hover {
        border: ${(props) => `3px solid ${props.$color}`};
        height: calc(3rem - 3px);
        width: calc(12rem - 6px);
    }
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

const ProgressAndCloseArea = styled.div`
    display: flex;
    align-items: center;
`;

const ProgressPieContainer = styled.div`
    height: 1.5rem;
    width: 1.5rem;
`;

const CloseIcon = styled.img`
    height: 1rem;
    width: 1rem;
    margin: 0 0.5rem 0 0.4rem;
    border-radius: 5px;
    &:hover {
        border: 1px solid grey;
        height: calc(1rem - 2px);
        width: calc(1rem - 2px);
    }
`;

export default ToastCard;
