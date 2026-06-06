import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { client } from '@/clinet/clinet'

interface DataType {
    name: string
    surname: string
    info: string
    price: string
    _id: string
    thumbnail: {
        asset: {
            _ref: string
        }
    }
}

interface ReviewType {
    _id: string
    rating: number
    comment: string
    status?: string
    user?: {
        _id?: string
        name?: string
        surname?: string
    }
}


type SanityBaseQueryArgs = {
    query?: string
    method?: 'GET' | 'POST' | 'DELETE' | 'PATCH'
    params?: any
    body?: any
}

const BaseQuery: BaseQueryFn<SanityBaseQueryArgs, unknown, unknown> = async ({ query = '', method = 'GET', params, body }) => {
    try {
        if (method === 'GET') {
            const data = await client.fetch(query, params)
            return { data }
        }

        if (method === 'POST') {
            const data = await client.create(body)
            return { data }
        }

        if (method === 'DELETE') {
            const data = await client.delete(body)
            return { data }
        }

        if (method === 'PATCH') {
            const { id, comment, rating } = body
            const data = await client.patch(id).set({ comment, rating }).commit()
            return { data }
        }

        return { data: null }
    } catch (error) {
        console.log('Error...', error)
        return {
            error: {
                status: (error as any)?.statusCode ?? 500,
                data: (error as any)?.message ?? String(error),
            },
        }
    }
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: BaseQuery,
    tagTypes: ['review'],
    endpoints: ({ query, mutation }) => ({
        getProducts: query<DataType[], void>({
            query: () => ({
                query: `*[_type=='product']`,
            }),
        }),
        getProductById: query<DataType, string>({
            query: (id) => ({
                query: `*[_type == "product" && _id == $id][0]`,
                params: { id },
            }),
        }),
        getReview: query<ReviewType[], string | undefined>({
            query: (id) => ({
                query: `*[_type == 'review' && product._ref == $id] { _id, rating, comment, status, user->{_id, name, surname} }`,
                params: { id },
            }),
            providesTags: ["review"]
        }),
        createReview: mutation<any, any>({
            query: (payload) => ({
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ["review"]
        }),
        deleteReview: mutation<any, any>({
            query: (id) => ({
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ['review']
        }),
        updateReview: mutation<unknown, { id: string; rating: number; comment: string }>({
            query: (payload) => ({
                method: 'PATCH',
                body: payload,
            }),
            invalidatesTags: ['review'],
        }),
        getProductByIdArr: query<DataType[], string[]>({
            query: (array) => ({
                query: `*[_type == "product" && _id in $array]`,
                params: { array }
            })
        }),
        getUser: query<any, any>({
            query: (id) => ({
                query: `*[_type == "user" && _id == $id][0]`,
                params: { id }
            })
        })
    }),
})

export const { useGetProductByIdQuery, useGetProductsQuery, useGetReviewQuery, useCreateReviewMutation, useDeleteReviewMutation, useGetProductByIdArrQuery, useUpdateReviewMutation, useGetUserQuery } = api
export type { ReviewType }