import { useGetAddressQuery } from "@/store/api"
import { AddressForm } from "./AddressForm"
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";

export default function Address() {
    const userId = JSON.parse(localStorage.getItem("user")!)._id
    const { data, isLoading } = useGetAddressQuery(userId)
    console.log(data)

    return (
        <div className="grid grid-cols-2 gap-5">
            <div className="border rounded-2xl p-5">
                <p className="font-semibold text-xl">The Address You Entered</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {
                        data?.map((item: any) => (
                            <div key={item._id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                                <div className="space-y-2 text-sm text-gray-700">
                                    <p><span className="font-semibold">City:</span> {item.address_name}</p>
                                    <p><span className="font-semibold">House Address:</span> {item.location}</p>
                                    <p><span className="font-semibold">Phone:</span> {item.phone_number}</p>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <button className="rounded-xl border border-red-500 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 cursor-pointer flex items-center gap-1">Delete <FaRegTrashCan /></button>
                                    <button className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer flex items-center gap-1">Edit <LuPencil /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <AddressForm />
        </div>
    )
}