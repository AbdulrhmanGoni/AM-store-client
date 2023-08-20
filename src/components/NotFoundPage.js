import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const NotFoundPage = () => {
    return (
        <ErrorPage
            errorType={404}
            message={`Sory! we couldn't found '${useParams().pagePath}' page`}
            title="Not Found Page"
            alertType="error"
        />
    );
}

export default NotFoundPage;
