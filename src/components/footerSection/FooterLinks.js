import Link from 'next/link';
import { List, ListItem } from '@mui/material';
import { P } from '@abdulrhmangoni/am-store-library';
import { underlineOnHover } from './FooterEndSection';

export default function FooterLinks() {
    return (
        <>
            <P variant='h6' fontWeight="bolder" ml="-0px">Catagories</P>
            <List>
                {
                    links.map(({ link, name }) => {
                        return (
                            <ListItem key={name} disablePadding>
                                <Link href={link}>
                                    <P sx={{ ...underlineOnHover, transition: ".3s" }}>
                                        {name}
                                    </P>
                                </Link>
                            </ListItem>
                        )
                    })
                }
            </List>
        </>
    )
}

const links = [
    {
        name: "Figures",
        link: "/products?category=figures"
    },
    {
        name: "Panels",
        link: "/products?category=panels"
    },
    {
        name: "Clothes",
        link: "/products?category=clothes"
    }
]
