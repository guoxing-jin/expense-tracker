import styled from 'styled-components'

const StyledInput = styled.input`
    border: var(--border);
    border-radius: 3px;
    box-shadow: var(--shadow);

    font: var(--font-body);
    color: var(--cod-gray-100);

    :focus {
        border: var(--border-focused);
        outline: none;
    }
`

export default StyledInput
