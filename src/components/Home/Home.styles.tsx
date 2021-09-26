import styled from "styled-components";

export const AnimatedCharacter = styled.span`
    @keyframes animateCharacter {
        to {
            opacity: 1;
            pointer-events: all;
            user-select: all;
        }
    }
    animation: animateCharacter 0s forwards;
    pointer-events: none;
    user-select: none;
    opacity: 0;
`;
