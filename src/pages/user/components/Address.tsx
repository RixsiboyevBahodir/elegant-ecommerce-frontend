"use client"

import { useGetAddressQuery } from "@/store/api"
import { AddressForm } from "./AddressForm"

export default function AddressPage() {
    const userId = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") ?? "null")?._id : ""
    const { data, isLoading } = useGetAddressQuery(userId)

    return (
        <div className="mx-auto min-h-[calc(100vh-5rem)] max-w-6xl px-4 py-8 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
                <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900">Saved Addresses</h1>
                            <p className="mt-1 text-sm text-slate-500">Manage your delivery addresses here.</p>
                        </div>
                        <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                            {isLoading ? "Loading..." : `${data?.length ?? 0} address${data?.length === 1 ? "" : "es"}`}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                                Loading your saved addresses...
                            </div>
                        ) : !data?.length ? (
                            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                                You don’t have any saved addresses yet.
                            </div>
                        ) : (
                            data.map((item: any) => (
                                <article key={item._id} className="rounded-3xl border border-gray-200 bg-slate-50 p-5 shadow-sm transition hover:border-gray-300">
                                    <p className="text-lg font-semibold text-slate-900">{item.address_name}</p>
                                    <p className="mt-2 text-sm text-slate-600">{item.location}</p>
                                    <p className="mt-3 text-sm text-slate-500">{item.phone_number}</p>
                                </article>
                            ))
                        )}
                    </div>
                </section>

                <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900">Add New Address</h2>
                        <p className="mt-1 text-sm text-slate-500">Fill in your address details to save a new delivery location.</p>
                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-slate-50 p-5">
                        <AddressForm />
                    </div>
                </section>
            </div>
        </div>
    )
}

