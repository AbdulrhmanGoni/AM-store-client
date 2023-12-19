"use client"
import MainAppBar from '@/components/MainAppBar';
import MobileBar from '@/components/MobileBar';
import SectionTitle from "@/components/SectionTitle";
import SliderProduct from "@/components/SliderProduct";
import { catagoriesInfo } from "@/CONSTANT/CATEGORIES";
import { Container, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
          p: { xs: "0px 8px", sm: "0px 16px" },
          bgcolor: "background.default"
        }}
      >
        <SectionTitle
          style={{ padding: "20px 0px" }}
          title="Best Selling"
          icon={
            <Image
              src="/best-seller.png"
              alt={"Best Selling Icon"}
              width={30}
              height={30}
            />
          }
        >
          <SliderProduct
            requestPath={`products/top-products?sort=sold&limit=10`}
            sliderId="top-products"
          />
        </SectionTitle>
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
                <SliderProduct
                  requestPath={`products/?category=${category}&limit=10`}
                  sliderId={category}
                />
              </SectionTitle>
            )
          })
        }
      </Container>
      {mobileDevice && <MobileBar />}
    </>
  )
}

