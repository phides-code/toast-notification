import styled from 'styled-components';

interface CardProps {
    isMobile: boolean;
}

const Card = ({ isMobile }: CardProps) => {
    const mobile = isMobile.toString();

    return <Wrapper $mobile={mobile}>Hello world</Wrapper>;
};

interface StyledComponentProps {
    $mobile: string;
}

const Wrapper = styled.div<StyledComponentProps>`
    display: flex;
    flex-direction: column;
    border: 1px solid red;

    margin: ${(props) => (props.$mobile === 'true' ? '0 0.5rem' : '0 5rem')};
    padding: ${(props) =>
        props.$mobile === 'true' ? '0.5rem 1rem' : '2rem 4rem'};
`;

export default Card;
