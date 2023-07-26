import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';
import { Alert, Card, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { host } from '../CONSTANT/hostName';
import { useFetch } from '../hooks/useFetch';


export default function SearchRecommender({ searchInput, setLoading }) {

    const navigate = useNavigate();
    const { data: results, isLoading } = useFetch(`${host}/products/?title=${searchInput}`, []);

    const resultsList = () => results.map((result) => {
        return (
            <ListItem key={result._id} component="div" disablePadding onClick={() => navigate(`/product-details/${result._id}`)} >
                <ListItemButton sx={{ justifyContent: "space-between", height: "40px" }}>
                    <Typography sx={{
                        fontSize: "15px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                        {result.title}
                    </Typography>
                    <Search sx={{ ml: "4px" }} />
                </ListItemButton>
            </ListItem>
        )
    })

    let heightOfList = results.length > 5 ? 200 : results.length * 40;

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading])

    return (
        <Card elevation={1}
            sx={{
                width: '100%', height: heightOfList,
                maxWidth: "100%", top: "100%", left: 0,
                position: "absolute", zIndex: 999
            }}
        >
            <FixedSizeList
                height={heightOfList}
                width="100%"
                itemSize={40}
                itemCount={results.length}
                overscanCount={5}
            >
                {resultsList}
            </FixedSizeList>
        </Card>
    );
}