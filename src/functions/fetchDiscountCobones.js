import customFetch from '@/functions/customFetch';

export default async function fetchDiscountCobones() {
    return await customFetch(`settings/cobones?toObject=true`);
}
