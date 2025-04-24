import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useSelector } from 'react-redux';
export const BASE_URL = 'http://localhost:5000';

const baseQuery = fetchBaseQuery({
    baseUrl:`${BASE_URL}/api/v1`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = window.localStorage.get('token');
        if(token){
           headers.set('Authorization', `Bearer ${token}`)
        }
       return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log('Run Base query with Reauth');
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if(result?.error?.originalStatus === 401){
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery('/user/refresh-token', api, extraOptions); 
                if (refreshResult?.data) {
                    // store the new token
                    const user = api.getState().auth.user;
                    const { data } = refreshResult.data;
                    api.dispatch(setCredentials({user: user, token:data?.refreshToken}))
                    // api.dispatch(setToken({token: data?.refreshToken}));
                    // api.dispatch(setCredentials({user}))
                    // retry the original query with the new access token
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    // logout or handle refresh token error
                    await baseQuery('/user/logout', api, extraOptions);
                    api.dispatch(logOut());
                }
            } finally {
                release();
            }
        }else {
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
}
export const apiSlice = createApi({
    baseQuery:baseQueryWithReauth,
    endpoints:(builder) => (builder)
})
