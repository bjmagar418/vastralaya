import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
<<<<<<< HEAD
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
  }),
  tagTypes: ["User"],
=======
  baseUrl: "http://localhost:5005/api/auth",
  credentials: "include",
}),

  tagTypes: ["User"],

>>>>>>> 622f74401f3f7abab73f1ddce8bbc6f41144d882
  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    getUser: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),

    editProfile: builder.mutation({
<<<<<<< HEAD
      query: (profilePayload) => ({
        url: "../users/edit-profile",
        method: "PATCH",
        body: profilePayload, // This sends the entire object including the userId
=======
      query: ({ userId, profileData }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: profileData,
>>>>>>> 622f74401f3f7abab73f1ddce8bbc6f41144d882
      }),
      invalidatesTags: ["User"],
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation,
} = authApi;

export default authApi;