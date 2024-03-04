import { FormControl, Input, InputLabel } from '@mui/material';
import { P } from '@abdulrhmangoni/am-store-library';

export default function FormInput({ Icon, state: { error, message } = {}, label, id, placeholder, type }) {
    return (
        <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel error={error}>{label}</InputLabel>
            <Input error={error}
                id={id}
                placeholder={placeholder || label}
                type={type}
                startAdornment={
                    <Icon sx={{ color: error ? "red" : "primary.main", mr: "6px" }} />
                }
            />
            {error && <P sx={{ color: "error.main", fontSize: "13px", mt: .5 }} >{message}</P>}
        </FormControl>
    )
}
