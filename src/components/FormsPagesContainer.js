import { Container, CssBaseline } from '@mui/material'
import PageWidthBG from './PageWidthBG'

export default function FormsPagesContainer({ children, bgImage }) {
    return (
        <PageWidthBG bgImage={bgImage}>
            <Container maxWidth="xs">
                <CssBaseline />
                {children}
            </Container>
        </PageWidthBG>
    )
}
