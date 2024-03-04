import { AddCard, List } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

export default function OptionsBar({ render }) {
    return (
        <Box className="flex-row j-end" sx={{ flexWrap: "wrap", mt: 1 }}>
            <Button
                {...optionsButtonsProps({
                    onClick: () => render("add_card"),
                    icon: <AddCard />
                })}
            >
                Add card
            </Button>
            <Button
                {...optionsButtonsProps({
                    onClick: () => render("cards_list"),
                    icon: <List />
                })}
            >
                cards list
            </Button>
        </Box>
    )
}

function optionsButtonsProps({ onClick, icon }) {
    return {
        onClick,
        size: 'small',
        sx: {
            fontSize: { xs: "11px", sm: "14px" },
            p: { xs: "2px 5px", sm: "3px 9px" },
            width: "fit-content",
            color: "text.primary"
        },
        startIcon: icon
    }
}