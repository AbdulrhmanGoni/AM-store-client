import { useParams } from 'react-router-dom';
import { ErrorThrower } from '@abdulrhmangoni/am-store-library';
import { notFound } from '../CONSTANT/images';

const NotFoundPage = () => {
    return (
        <ErrorThrower
            errorType={404}
            customIllustrate={notFound}
            message={`Sory! we couldn't found '${useParams().pagePath}' page`}
            title="Not Found Page"
            alertType="error"
        />
    );
}

export default NotFoundPage;
