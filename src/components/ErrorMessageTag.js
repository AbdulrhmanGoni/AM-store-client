import { P } from "@abdulrhmangoni/am-store-library";


export default function ErrorMessageTag({ messge }) {
    return (
        <P sx={{ fontSize: "0.87rem", color: "red", mt: "5px" }}>{messge}</P>
    )
}