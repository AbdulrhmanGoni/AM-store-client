import { ErrorThrower } from '@abdulrhmangoni/am-store-library'
import { CircularProgress, LinearProgress } from '@mui/material'

const loadingTypes = [
    {
        illustratorType: "waiting",
        loadingElement: <CircularProgress
            sx={{ position: "absolute", top: "10%" }}
            size={30}
        />
    },
    {
        illustratorType: "waiting1",
        loadingElement: <LinearProgress
            sx={{ position: "absolute", width: "100%", bottom: 0 }}
        />
    },
    {
        illustratorType: "waiting2",
        loadingElement: <LinearProgress
            sx={{ position: "absolute", width: "100%", top: 0 }}
        />
    }
]

export default function LoadingPage() {
    let randomIndex = Math.floor(Math.random() * loadingTypes.length)
    let randomType = loadingTypes[randomIndex];
    return (
        <ErrorThrower
            illustratorType={randomType.illustratorType}
            fullPage hideAlertMsg
            paperStyle={{ position: "relative" }}
        >
            {randomType.loadingElement}
        </ErrorThrower>
    )
}
