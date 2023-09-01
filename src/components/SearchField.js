import { styled, alpha } from '@mui/material/styles';
import { Box, CircularProgress, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchRecommender from './SearchRecommender';
import { useEffect, useState } from 'react';
import { Cancel } from '@mui/icons-material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: "100%",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
    },
}));

const SearchField = ({ sx, currentParam }) => {

    const navigate = useNavigate();

    const { pagePath } = useParams();
    const [searchParams, setSearchParam] = useSearchParams();
    const [isFocus, setFocus] = useState(false);
    const [searchInput, setSearchInput] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSubmitSearch(event) {
        event.preventDefault();
        if (searchInput !== searchParams.get("title")) {
            if (pagePath === "search") {
                setSearchParam({ title: searchInput });
            } else {
                navigate("/search/?title=" + searchInput);
            }
        }
    }

    function closeAll() {
        const searchField = document.querySelector(".MuiInputBase-input");
        setFocus(false);
        setSearchInput(null);
        searchField.value = null;
    }

    useEffect(() => {
        const searchField = document.querySelector(".MuiInputBase-input");
        document.addEventListener("click", () => {
            if (document.activeElement === searchField) {
                setFocus(true);
            } else {
                setFocus(false);
            }
        })
        if (currentParam) {
            searchField.value = currentParam;
            setSearchInput(currentParam);
        }
    }, [currentParam]);

    const iconStyle = {
        position: "absolute",
        fontSize: "1rem",
        cursor: "pointer",
        right: 8, top: "50%",
        transform: "translateY(-50%)"
    }

    return (
        <>
            <Box component="form" sx={{ flexGrow: "1", ...sx }} onSubmit={handleSubmitSearch}>
                <Search
                    id='searchField'
                    onChange={(ev) => setSearchInput(ev.target.value)}
                    sx={{ position: "relative", m: "0 !important" }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }} />
                    {
                        isFocus && searchInput ?
                            <>
                                <SearchRecommender setLoading={setLoading} searchInput={searchInput} />
                                {loading ? <CircularProgress sx={{ ...iconStyle, top: "30%", color: "inherit" }} size={15} /> : <Cancel
                                    onClick={() => closeAll()}
                                    sx={iconStyle}
                                />}
                            </>
                            :
                            null
                    }
                </Search>
            </Box>
        </>
    );
}

export default SearchField;
