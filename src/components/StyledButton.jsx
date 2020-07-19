import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: var(--lily-white-40);
    border: var(--border);
    border-radius: 3px;
    box-shadow: var(--shadow);

    font: var(--font-body);
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

export default StyledButton
