import "./SliderProduct.css"
import SectionTitle from "./SectionTitle"
import { catagoriesInfo } from "../dataBase/Categories/CATEGORIES"
import SliderProduct from "./SliderProduct"

export default function Overview() {

    return (
        <>
            {catagoriesInfo.map((catagory) => {
                return (
                    <SectionTitle style={{ padding: "20px 0px" }} key={catagory.name} title={catagory.name}>
                        <SliderProduct theCatagory={catagory.name} />
                    </SectionTitle>
                )
            })}
        </>
    )
}