import { urlFor } from "@/clinet/clinet"
import ReviewModel from "@/components/review-model/ReviewModel"
import useFavourite from "@/hooks/useFavourite"
import useWishlist from "@/hooks/useWishlist"
import { useGetProductByIdQuery, useGetReviewQuery } from "@/store/api"
import { useParams } from "react-router-dom"
import { SlHeart } from "react-icons/sl";
import { TbShoppingBagCheck, TbShoppingBagPlus } from "react-icons/tb";
import { FaHeart } from "react-icons/fa"

export default function Product() {

    const params = useParams()
    const { data, isLoading } = useGetProductByIdQuery(params.id!)
    const { data: dataReview, isLoading: LoadingReview } = useGetReviewQuery(params.id)

    const { addWishlist, productId } = useWishlist()
    const { addFavourite, productId: favouriteId } = useFavourite()

    const user = JSON.parse(localStorage.getItem("user")!)
    const favourites = user.favourite
    const wishlist = user.wishlist

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-32">
                <p className="text-lg text-gray-500">Loading...</p>
            </div>
        )
    }

    const colors = Array.isArray(data!.colors) ? data!.colors : []
    const reviews = Array.isArray(dataReview) ? dataReview : []
    const approvedReviews = reviews.filter((review) => review.status !== 'rejected')
    const averageRating = approvedReviews.length
        ? (approvedReviews.reduce((sum, review) => sum + (review.rating ?? 0), 0) / approvedReviews.length).toFixed(1)
        : null

    return (
        <>
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
                        <img
                            src={urlFor(data!.thumbnail.asset._ref).toString()}
                            alt={data!.name}
                            className="h-96 w-full object-cover"
                        />
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{data!.name}</h1>
                            <p className="text-lg text-gray-600">{data!.info}</p>
                        </div>

                        <div className="space-y-4 rounded-2xl bg-gray-50 p-6">
                            <div className="flex items-baseline gap-4">
                                {data!.discoundPrice ? (
                                    <span className="text-4xl font-semibold text-gray-900">${data!.discoundPrice}</span>
                                ) : null}
                                <span className={`text-lg font-bold ${data!.discoundPrice ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                    ${data!.price}
                                </span>
                            </div>

                            <div className="grid gap-3 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Discount valid until:</span>
                                    <span className="font-medium text-gray-900">{data!.discountExpire ?? 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Stock Available:</span>
                                    <span className="font-medium text-gray-900">{data!.quantity ?? 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {colors.length > 0 && (
                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-gray-900">Available Colors</p>
                                <div className="flex flex-wrap gap-2">
                                    {colors.map((color) => (
                                        <span
                                            key={color}
                                            className={`rounded-full px-4 py-2 text-sm bg-gray-100 cursor-pointer`}
                                            style={{ color: color, border: `1px solid ${color}` }}
                                        >
                                            {color}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={(e) => addWishlist(e, data!._id)}
                                className="flex items-center gap-4 justify-center flex-1 rounded-xl border-2 border-gray-900 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 cursor-pointer">
                                {
                                    wishlist.some((wish: any) => wish._ref === data?._id) ? (
                                        <><TbShoppingBagCheck className="text-xl" /> Added</>
                                    ) : (
                                        <>
                                            <TbShoppingBagPlus className="text-xl" />{productId === data!._id ? 'Loading...' : 'Add to Wishlist'}
                                        </>
                                    )
                                }
                            </button>
                            <button
                                onClick={(e) => addFavourite(e, data!._id)}
                                className="flex items-center gap-4 justify-center flex-1 rounded-xl border-2 border-gray-900 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 cursor-pointer">
                                {
                                    favourites.some((fav: any) => fav._ref === data?._id) ?
                                        (
                                            <>
                                                <FaHeart className="text-xl text-red-500" />
                                                <p>Added</p>
                                            </>
                                        ) : (
                                            <>
                                                <SlHeart className="text-xl text-gray-500" />
                                                <p>Add to Favorites</p>
                                            </>
                                        )
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">Customer reviews</p>
                            <h2 className="mt-2 text-2xl font-semibold text-gray-900">What people are saying</h2>
                        </div>
                        <div className="rounded-3xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900">
                            {averageRating ? (
                                <span>{averageRating} / 5 · {approvedReviews.length} reviews</span>
                            ) : (
                                <span>No reviews yet</span>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        {reviews.length > 0 ? (
                            reviews.map((review) => {
                                const reviewer = review.user?.name ? `${review.user.name}${review.user.surname ? ` ${review.user.surname}` : ''}` : 'Anonymous'
                                const filledStars = Math.round(review.rating ?? 0)

                                return (
                                    <article key={review._id} className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">{reviewer}</p>
                                                <p className="text-sm text-gray-500">{review.rating} / 5</p>
                                            </div>
                                            <div className="flex gap-1 text-yellow-500">
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <span key={index}>{index < filledStars ? '★' : '☆'}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-4 text-sm leading-6 text-gray-600">{review.comment}</p>
                                    </article>
                                )
                            })
                        ) : (
                            <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-sm text-gray-500">
                                Hech qanday sharh yo'q. Siz birinchi bo'lishingiz mumkin.
                            </div>
                        )}
                    </div>

                    <div className="mt-6 sm:text-right">
                        <ReviewModel title="Write a Review" />
                    </div>
                </div>
            </section>
        </>
    )
}

