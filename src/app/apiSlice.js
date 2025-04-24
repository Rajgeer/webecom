import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const BASE_URL = 'http://localhost:5000';

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders(headers, { getState }){
            const token = getState().auth.token;
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            // headers.set('x-api-key', API_KEY);
            return headers;
        }
    }),
    endpoints(builder){
        return {
            
            login:builder.mutation({
                query(data){
                    return {
                        url: '/api/auth/login',
                        method: 'POST',
                        body: data,
                    }
                }
            }),
            register:builder.mutation({
                query(data){
                    return{
                        url:'/api/auth/register',
                        method:'POST',
                        body: data,
                    }
                }
            }),
            createProduct:builder.mutation({
                query(data){
                    return{
                        url:'/api/products',
                        method:'POST',
                        body:data
                    }
                }
            }),
            fetchProducts:builder.query({
                query(){
                    return `/api/products`
                }
            }),
            createOrder:builder.mutation({
                query(data){
                    return{
                        url:'/api/orders',
                        method:'POST',
                        data:data
                    }
                }
            }),
            fetchOrders:builder.query({
                query(){
                    return `/api/orders`
                }
            }),
            myOrders:builder.query({
                query(){
                    return '/api/orders/myorders'
                }
            }),
            fetchOrderById:builder.query({
                query(id){
                    return `/api/orders/${id}`
                }
            }), 
        }
    }
});

export const { 
    useLoginMutation,
    useRegisterMutation,
    useCreateProductMutation,
    useFetchProductsQuery,
    useFetchOrdersQuery,
    useMyOrdersQuery,
    useFetchOrderByIdQuery,
    useCreateOrderMutation

} = apiSlice;

