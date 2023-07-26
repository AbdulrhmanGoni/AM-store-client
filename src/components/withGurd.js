import { useCookies } from 'react-cookie';
import CantAccessMassage from './CantAccessMassage';
export default function withGurd(Component) {
    return () => {
        const userId = useCookies()[0].userId
        return userId ? <Component userId={userId} /> : <CantAccessMassage />
    }
}
