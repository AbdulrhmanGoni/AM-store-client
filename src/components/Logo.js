import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SVGLogo } from "../logo.svg";

const Logo = () => {
    const navigate = useNavigate();
    return (
        <IconButton
            sx={{ width: 50, height: 50, p: 0 }}
            onClick={function () { navigate("/") }}
        >
            <SVGLogo />
        </IconButton>
    );
}

export default Logo;
