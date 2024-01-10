import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { fetchStoreVariables } from '@/state-management/variables_slice';

export default function useFetchStoreVariable() {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(fetchStoreVariables()) }, []);
}
