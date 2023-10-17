"use client"
import MainAppBar from '@/components/MainAppBar';
import MobileBar from '@/components/MobileBar';
import SectionTitle from "@/components/SectionTitle";
import SliderProduct from "@/components/SliderProduct";
import { catagoriesInfo } from "@/dataBase/Categories/CATEGORIES";
import { Container, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const mobileDevice = useMediaQuery("(max-width: 599px)");
  const { push } = useRouter();

  return (
    <>
      <MainAppBar />
      <Container maxWidth="lg" sx={{ height: "100%", mb: "57px" }}>
        {
          catagoriesInfo.map(({ name: category }) => {
            return (
              <SectionTitle
                style={{ padding: "20px 0px" }}
                key={category}
                title={category}
                buttonText="View More"
                action={() => push(`products/?category=${category}`)}
              >
                <SliderProduct theCatagory={category} />
              </SectionTitle>
            )
          })
        }
      </Container>
      {mobileDevice && <MobileBar />}
    </>
  )
}

export const metadata = {
  title: "AM Store"
}
