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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Iusto, blanditiis officiis at repellendus maxime molestias ratione.
                Atque dolor, iusto ipsa at aspernatur porro id aliquam.
            </P>
        </Box>
    )
}
