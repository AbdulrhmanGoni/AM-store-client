import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { fetchStoreVariables } from '@/state-management/variables_slice';

export default function useStoreVariablesFetcher() {
    const dispatch = useDispatch();
    const variables = useSelector(state => state.variables);

    useEffect(() => { dispatch(fetchStoreVariables()) }, []);

    return {
        isLoading: variables.isLoading,
        isError: variables.isLoading,
        variables
    }
}
