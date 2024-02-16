import MainAppBar from '@/components/MainAppBar';
import MobileBar from '@/components/MobileBar';
import HomePageContainer from '@/components/homePage/HomePageContainer';
import BestProductsSlide from '@/components/homePage/BestProductsSlide';
import Footer from '@/components/footerSection/Footer';
import CategoriesSlides from '@/components/homePage/CategoriesSlides';

export default function HomePage() {
  return (
    <>
      <MainAppBar />
      <HomePageContainer>
        <BestProductsSlide />
        <CategoriesSlides />
      </HomePageContainer>
      <Footer />
      <MobileBar />
    </>
  )
}

