import { useCookies } from 'react-cookie';
import CantAccessMessage from './CantAccessMessage';
export default function withGurd(Component) {
    return () => {
        const userId = useCookies()[0].userId
        return userId ? <Component userId={userId} /> : <CantAccessMessage />
    }
}
