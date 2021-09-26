import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 800px;
    height: 500px;
    border: 1px solid rgb(58, 58, 58);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
    padding: 2px;
    cursor: text;
    height: 100%;
    ${(props) => css`
        background-color: ${props.theme.colors.body};
    `}
`;

export const Toolbar = styled.div`
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    padding: 1rem;
    text-align: center;
    pointer-events: none;
    user-select: none;
    ${(props) => css`
        background-color: ${props.theme.colors.toolbar};
    `};
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
`;

export const ListItem = styled.li`
    &.active {
        &::after {
            content: " <";
        }
    }
`;

export const User = styled.span`
    font-weight: 600;
    ${(props) => css`
        color: ${props.theme.colors.user};
        ::selection {
            color: ${props.theme.colors.body};
            background-color: ${props.theme.colors.user};
        }
    `}
`;

export const Path = styled.span`
    ${(props) => css`
        color: ${props.theme.colors.path};
        ::selection {
            color: ${props.theme.colors.body};
            background-color: ${props.theme.colors.path};
        }
    `}
`;

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
