import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import headerImage from '../../assets/header.svg'

export default function Header() {
  return (
    <div>
        <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem >
            <img src={headerImage} alt="" className=" rounded-3xl" />
          </CarouselItem>
          <CarouselItem >
            <img src={headerImage} alt="" className=" rounded-3xl" />
          </CarouselItem>
          <CarouselItem >
            <img src={headerImage} alt="" className=" rounded-3xl" />
          </CarouselItem>
          <CarouselItem >
            <img src={headerImage} alt="" className=" rounded-3xl" />
          </CarouselItem>
          <CarouselItem >
            <img src={headerImage} alt="" className=" rounded-3xl" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex items-center justify-between py-5 font right-0">
        <p className="font-medium text-[72px] leading-18 max-w-130">Simply Unique<span className="text-gray-600">/</span> Simply Better<span className="text-gray-600">.</span></p>
        <p className="text-[16px] max-w-110 text-gray-600"><span className="text-black">3legant</span> is a gift & decorations store based in HCMC, Vietnam. Est since 2019. </p>
      </div>
      <div></div>
    </div>
  )
}
