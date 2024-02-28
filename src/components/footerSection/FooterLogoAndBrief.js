import { Box } from '@mui/material';
import AMLogo from '../AMLogo'
import { P } from '@abdulrhmangoni/am-store-library';

export default function FooterLogoAndBrief() {
    return (
        <Box mb={{ xs: 2, md: 0 }} className="flex-column gap1">
            <AMLogo
                transparent
                sx={{ width: "130px", height: "70px", ml: "-12px" }}
            />
            <P maxWidth={{ md: 400 }}>
                AM Store where any otaku wish to find.
                Here you will find the best Japanes Anime and Manga products
                with different categories like figures, panels, clothes and more.
            </P>
        </Box>
    )
}
