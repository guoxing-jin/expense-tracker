import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    background-color: var(--lily-white-40);
    border: var(--border);
    border-radius: 3px;
    box-shadow: var(--shadow);

    display: flex;
    justify-content: center;
    align-items: center;
    font: var(--font-body);
    text-decoration-line: none;
    color: var(--cod-gray-100);

    :hover {
        background-color: var(--lily-white-80);
        cursor: pointer;
    }
    :focus {
        border: var(--border-focused);
        outline: none;
    }
`

export default StyledLink
