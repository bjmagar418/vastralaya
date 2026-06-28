
import { createSlice } from "@reduxjs/toolkit";
import { getBaseUrl } from "../../../utils/baseURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({
        name, // 1. Accept the incoming search text
        category,
        color,
        brands,
        page = 1,
        limit = 10,
        min,
        max,
        createdBy,
      } = {}) => {
        // 2. Append the name safely if it exists, otherwise leave it empty
        const paramsObj = {
          category: category || "",
          color: color || "",
          min: min || "",
          max: max || "",
          page: page.toString(),
          limit: limit.toString(),
        };

        if (name) paramsObj.name = name; // 👈 3. Dynamically inject it into the search query object

        const queryParams = new URLSearchParams(paramsObj).toString();
        return `/?${queryParams}`;
      },
      providedTags: ["Products"],
    }),

    fetchProductsById: builder.query({
      query: (id) => `/${id}`,
      providedTags: (result, error, id) => [
        {
          type: "Products", // Changed from "Product" to match your tagTypes
          id,
        },
      ],
    }),

    addProduct: builder.mutation({
      // Lowercased 'addProduct' to match standard naming conventions
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
        //credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),

    fetchRelatedProducts: builder.query({
      query: (id) => `/related/${id}`,
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: "PUT",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id },
        "Products",
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Products", id },
        "Products",
      ],
    }),

    // --- NEW ENDPOINTS BASED on EXPRESS ROUTER ---

    fetchCategories: builder.query({
      query: () => "/categories",
    }),

    fetchProductsByCategory: builder.query({
      query: (category) => `/category/${category}`,
      providedTags: ["Products"],
    }),

    fetchBrands: builder.query({
      query: () => "/brands",
    }),

    fetchCategory: builder.query({
      query: () => "/category",
    }),

    fetchTotalCount: builder.query({
      query: () => "/totalCount",
    }),
  }),
});

// Generated Hooks Export
export const {
  useFetchAllProductsQuery,
  useFetchProductsByIdQuery,
  useAddProductMutation, // Fixed name to reflect it's a mutation
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchRelatedProductsQuery,
  // New hooks:
  useFetchCategoriesQuery,
  useFetchProductsByCategoryQuery,
  useFetchBrandsQuery,
  useFetchCategoryQuery,
  useFetchTotalCountQuery,
} = productsApi;

export default productsApi;