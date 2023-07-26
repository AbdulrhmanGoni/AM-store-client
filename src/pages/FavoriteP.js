import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from "react-redux"
import EmptyMassege from '../components/EmptyMassege';
import { useNavigate } from 'react-router-dom';
import { host } from '../CONSTANT/hostName';
import { useAction } from '../hooks/useAction';
import LoadingCircle from '../components/LoadingCircle';
import { useEffect } from 'react';
import { testingImage2 } from '../CONSTANT/testingImage';

function TitlebarImageList({ products, listTitle }) {

    const navigate = useNavigate();

    return (
        <ImageList>
            <ImageListItem key={listTitle} cols={2}>
                <ListSubheader component="div">{listTitle}</ListSubheader>
            </ImageListItem>
            {products.map((item) => (
                <ImageListItem key={item._id}>
                    <img
                        src={testingImage2}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        subtitle={"price: " + item.price + "$"}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                                onClick={() => navigate(`/product-details/${item._id}`)}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

function FavoriteP() {

    const { favorites: productsIds = [] } = useSelector(state => state);
    const { data: products = [], isLoading, isError, reAction } = useAction(`${host}/products`, "POST", { productsIds });

    useEffect(() => {
        reAction();
    }, [productsIds]);

    if (products) {
        return (<>
            {
                isLoading ?
                    <LoadingCircle />
                    : isError ?
                        <EmptyMassege customMsg="Something Went Wrong" />
                        : products.length ?
                            <TitlebarImageList products={products} />
                            : <EmptyMassege sectionName="Favorites" />
            }
        </>)
    }
}

export default FavoriteP;