import { Outlet, useNavigate } from "react-router-dom";
import chair from '../../assets/chair.jpg'
import { useEffect } from "react";

export default function Auth() {

  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname == '/auth' || window.location.pathname == '/auth/' || window.location.pathname == '') {
      navigate('login')
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="grid w-full max-w-7xl grid-cols-1 overflow-hidden rounded-[36px] bg-white shadow-2xl md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-between  p-10 md:p-12">
          <div className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-600">3legant.</div>
          <div className="flex flex-1 items-center justify-center py-8">
            <img src={chair} alt="Elegant chair" className="h-full max-h-[560px] w-full object-contain" />
          </div>
        </div>
        <div className="flex items-center justify-center bg-white p-10 md:p-14">
          <div className="w-full max-w-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
