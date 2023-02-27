import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
    ${reset}

    body {
        width: 414px;
        margin: 0 auto;
        box-sizing: border-box;
    }
`

export default GlobalStyle
