import { useParams } from 'react-router-dom';
import { ErrorThrower } from '@abdulrhmangoni/am-store-library';

const NotFoundPage = () => {
    return (
        <ErrorThrower
            title="Not Found Page"
            illustratorType="notFound"
            message={`Sory! we couldn't found '${useParams().pagePath}' page`}
        />
    );
}

export default NotFoundPage;
