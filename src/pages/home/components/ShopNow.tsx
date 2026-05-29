import { BsArrowRight } from "react-icons/bs";
import sofa from '../../../assets/sofa.svg'
import cabinet from '../../../assets/cabinet.jpg'
import toaster from '../../../assets/toaster.jpg'


export default function ShopNow() {
    return (
        <div className="flex items-stretch gap-6 py-8">
            <div className="w-1/2 rounded-[2rem] bg-[#F3F5F7] p-8 flex flex-col justify-between shadow-sm">
                <div>
                    <p className="text-3xl font-semibold">Living Room</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm underline decoration-1">
                        <p>Shop Now</p>
                        <BsArrowRight />
                    </span>
                </div>
                <img className="mt-8 w-full rounded-[2rem] object-cover" src={sofa} alt="Living Room" />
            </div>

            <div className="w-1/2 flex flex-col gap-6">
                <div className="flex-1 rounded-[2rem] p-6 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-2xl font-semibold">Bedroom</p>
                        <span className="mt-3 inline-flex items-center gap-2 text-sm underline decoration-1">
                            <p>Shop Now</p>
                            <BsArrowRight />
                        </span>
                    </div>
                    <img className="max-h-70 w-auto object-contain" src={cabinet} alt="Bedroom" />
                </div>

                <div className="flex-1 rounded-[2rem] p-6 flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-2xl font-semibold">Kitchen</p>
                        <span className="mt-3 inline-flex items-center gap-2 text-sm underline decoration-1">
                            <p>Shop Now</p>
                            <BsArrowRight />
                        </span>
                    </div>
                    <img className="max-h-60 w-auto object-contain" src={toaster} alt="Kitchen" />
                </div>
            </div>
        </div>
    )
}
