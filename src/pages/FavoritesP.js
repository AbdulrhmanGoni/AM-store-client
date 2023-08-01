import {
    IconButton, ListSubheader,
    ImageListItemBar, ImageListItem,
    ImageList, Box, Typography,
    Tooltip,
    useMediaQuery,
    Button
} from '@mui/material';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { useAction } from '../hooks/useAction';
import LoadingCircle from '../components/LoadingCircle';
import { AvailabationState } from '../components/ProductCard';
import PriceDisplayer from '../components/PriceDisplayer';
import { CleaningServices, Delete, Info } from '@mui/icons-material';
import ErrorPage from '../components/ErrorPage';
import ActionAlert from '../components/ActionAlert';
import useFavoritesActions from '../hooks/useFavoritesActions';

function TitlebarImageList({ products, listTitle, setData }) {

    const navigate = useNavigate();
    const media = useMediaQuery("(max-width: 600px)");
    const { removeItem, removeAllItems } = useFavoritesActions({ productsState: setData });

    const itemsColumns = media ? 2 : products.length === 1 ? 2 : 1;

    return (
        <ImageList>
            <ImageListItem
                key={listTitle} cols={2}
                sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <ListSubheader sx={{ fontSize: "20px" }} component="div">{listTitle}</ListSubheader>
                <ActionAlert
                    title="Clear favorites"
                    message="Are you sure you want to remove all products in your favorites?"
                    action={removeAllItems}
                >
                    <Button
                        variant='contained'
                        size='small'
                        startIcon={<CleaningServices />}
                        color='error'>
                        Clear Favorites
                    </Button>
                </ActionAlert>
            </ImageListItem>
            {products.map(({ _id, title, price, description, images, amount }) => (
                <ImageListItem key={_id} cols={itemsColumns}>
                    <img
                        style={{ height: "300px!important" }}
                        src={images[0]}
                        alt={title}
                        loading="lazy"
                    />
                    <Box sx={{
                        position: "absolute", bottom: 0,
                        left: 0, width: "100%",
                        bgcolor: "rgba(0, 0, 0, 0.7)"
                    }}>
                        <ImageListItemBar
                            sx={{
                                position: "initial",
                                bgcolor: "transparent",
                                pr: 1, "& > .MuiImageListItemBar-titleWrap": {
                                    padding: "8px 8px 0px"
                                }
                            }}
                            title={title}
                            subtitle={
                                <Tooltip title={description}>
                                    <Typography
                                        variant='body2'
                                        sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                                    >
                                        {description}
                                    </Typography>
                                </Tooltip>
                            }
                            actionIcon={
                                <Tooltip title="more info">
                                    <IconButton
                                        aria-label={`info about ${title}`}
                                        onClick={() => navigate(`/product-details/${_id}`)}
                                    >
                                        <Info />
                                    </IconButton>
                                </Tooltip>
                            }
                        />
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: "0px 8px"
                        }}>
                            <Typography
                                variant='subtitle1'
                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                            >
                                Price : {<PriceDisplayer variant="body1" price={price} />}
                            </Typography>
                            <Tooltip title="remove from favorites">
                                <IconButton onClick={() => removeItem(_id)} fontSize='12px'>
                                    <Delete color='error' sx={{ fontSize: "1.35rem" }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <AvailabationState
                        amount={amount}
                        style={{ position: "absolute", top: -1, left: -1 }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

function FavoriteP() {

    const { favorites: productsIds = [] } = useSelector(state => state);
    const {
        data: products = [],
        isLoading, isError, setData
    } = useAction(`products`, "POST", { productsIds }, { fetchCondition: productsIds?.length, dependent: productsIds });

    return (<>
        {
            isLoading ?
                <LoadingCircle />
                : isError ?
                    <ErrorPage
                        title="Something went wrong"
                        message="There is Something Wrong, may its network error or unexpected error"
                        errorType='unexpected'
                        withRefreshButton
                    />
                    : products?.length ?
                        <TitlebarImageList listTitle="Favorites Products" setData={setData} products={products} />
                        : <ErrorPage
                            title="Favorites is empty"
                            hideAlertMsg
                            errorType='empty'
                        />
        }
    </>)
}

export default FavoriteP;