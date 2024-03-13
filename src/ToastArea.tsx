import styled from 'styled-components';
import ToastCard from './ToastCard';
import { useContext } from 'react';
import { ToastsContext } from './ToastContext';
import { AnimatePresence } from 'framer-motion';

const ToastArea = () => {
    const { toasts } = useContext(ToastsContext);

    return (
        <Wrapper>
            <AnimatePresence>
                {/* show only the last 4 toasts, if more than 4 */}
                {toasts.slice(Math.max(toasts.length - 4, 0)).map((toast) => (
                    <ToastCard key={toast.id} toast={toast} />
                ))}
            </AnimatePresence>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: fixed;
    top: 1rem;
    right: 1rem;
`;

export default ToastArea;
