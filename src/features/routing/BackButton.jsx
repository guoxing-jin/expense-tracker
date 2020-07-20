import React from 'react'
import { useHistory } from 'react-router-dom'
import LeftArrow from '../../../assets/left-arrow.svg'
import styled from 'styled-components'

const StyledBackButton = styled.button`
    padding: 4px 8px;
    background-color: transparent;
    border: none;
    border-radius: 3px;

    display: flex;
    align-items: center;
    font: var(--font-body);
    color: var(--cod-gray-80);

    svg {
        width: 20px;
        height: 20px;

        stroke-width: 0.1px;
        stroke: var(--cod-gray-80);
        fill: var(--cod-gray-80);

        margin-right: 4px;

        transition: transform 120ms ease-in-out;
    }

    :hover {
        cursor: pointer;

        & span {
            color: var(--cod-gray-100);
        }
        & svg {
            stroke: var(--cod-gray-100);
            fill: var(--cod-gray-100);

            transform: translateX(-4px);
        }
    }
    :focus {
        border: var(--border-focused);
        outline: none;
    }
`

const BackButton = () => {
    const history = useHistory()

    return (
        <StyledBackButton onClick={history.goBack} type="button">
            <LeftArrow />
            <span>Back</span>
        </StyledBackButton>
    )
}

export default BackButton
