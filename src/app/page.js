"use client"
import MainAppBar from '@/components/MainAppBar';
import MobileBar from '@/components/MobileBar';
import SectionTitle from "@/components/SectionTitle";
import SliderProduct from "@/components/SliderProduct";
import { catagoriesInfo } from "@/dataBase/Categories/CATEGORIES";
import { Container, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "AM Store"
}

export default function HomePage() {

  const mobileDevice = useMediaQuery("(max-width: 599px)");
  const { push } = useRouter();

  return (
    <>
      <MainAppBar />
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          mb: "57px",
          p: { xs: "0px 8px", sm: "0px 16px" }
        }}
      >
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

