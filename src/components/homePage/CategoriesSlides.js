"use client"
import { useRouter } from 'next/navigation';
import SectionTitle from '../SectionTitle';
import { useSelector } from 'react-redux';
import CategorySlide from './CategorySlide';

export default function CategoriesSlides() {

    const { push } = useRouter();
    const categoriesList = useSelector(state => state.variables.categoriesList);

    return <>
        {
            categoriesList.map(category => {
                return (
                    <SectionTitle
                        style={{ padding: "20px 0px", minHeight: "310px" }}
                        key={category}
                        title={category}
                        buttonText="View More"
                        action={() => push(`products/?category=${category}`)}
                    >
                        <CategorySlide category={category} />
                    </SectionTitle>
                )
            })
        }
    </>
}
