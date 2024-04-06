import Link from 'next/link';
import { List, ListItem } from '@mui/material';
import { P } from '@abdulrhmangoni/am-store-library';
import { underlineOnHover } from './FooterEndSection';
import { useSelector } from 'react-redux';

export default function FooterLinks() {

    const productsCategories = useSelector(state => state.variables.productsCategories);

    return (
        <>
            <P variant='h6' fontWeight="bolder" ml="-0px">Catagories</P>
            <List>
                {
                    productsCategories.map(category => {
                        return (
                            <ListItem key={category} disablePadding>
                                <Link href={`/products?category=${category}`}>
                                    <P sx={{
                                        ...underlineOnHover,
                                        transition: ".3s",
                                        textTransform: "capitalize"
                                    }}>
                                        {category}
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