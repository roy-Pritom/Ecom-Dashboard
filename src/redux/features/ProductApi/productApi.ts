import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (args: Record<string, any>) => ({
        url: "/product",
        method: "GET",
        params: args,
      }),
      providesTags:["product"]
    }),

    createProduct: builder.mutation({
      query: (formData) => {
            // console.log("redux",formData);
        return {
          url: "/product/create",
          method: "POST",
          contentType:"multipart/form-data",
          body: formData,
        }
        // headers: "Content-Type- Multiple",
      },
      invalidatesTags:["product"]

    }),

    updateProduct: builder.mutation({
      query: (formData) => {
            console.log("redux",formData);
        return {
          url: `/product/${formData.id}`,
          method: "PATCH",
          // contentType:"multipart/form-data",
          body: formData.data,
        }
        // headers: "Content-Type- Multiple",
      },
      invalidatesTags:["product"]
    }),
    deleteProduct: builder.mutation({
      query: (id:string) => {
        return {
          url: `/product/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags:["product"]
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags:["product"]

    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi;
