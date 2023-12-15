import { useParams } from 'react-router-dom';
import { IllustrationCard } from '@abdulrhmangoni/am-store-library';

const NotFoundPage = () => {
    return (
        <IllustrationCard
            title="Not Found Page"
            illustratorType="notFound"
            fullPage
            message={`Sory! we couldn't found '${useParams().pagePath}' page`}
        />
    );
}

export default NotFoundPage;
