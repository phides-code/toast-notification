import styled from 'styled-components';
import ToastCard from './ToastCard';
import { useContext } from 'react';
import { ToastsContext } from './ToastContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ToastArea = () => {
    const { toasts } = useContext(ToastsContext);

    return (
        <Wrapper>
            <TransitionGroup className='toast-list'>
                {/* show only the last 4 toasts, if more than 4 */}
                {toasts.slice(Math.max(toasts.length - 4, 0)).map((toast) => (
                    <CSSTransition
                        key={toast.id}
                        timeout={700}
                        classNames='item'
                        nodeRef={toast.nodeRef}
                    >
                        <ToastCard toast={toast} ref={toast.nodeRef} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: fixed;
    top: 1rem;
    right: 1rem;
`;

export default ToastArea;
