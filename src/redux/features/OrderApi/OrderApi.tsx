import { baseApi } from "../../api/baseApi";

const   orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: (args: Record<string, any>) => ({
        url: "/order",
        method: "GET",
        params: args,
      }),
      providesTags:["order"]
    }),
    updateOrder: builder.mutation({
      query: (data) => {
        return {
          url: `/order/${data.id}`,
          method: "PATCH",
          body: data.data,
        }
        // headers: "Content-Type- Multiple",
      },
      invalidatesTags:["order"]
    }),
    deleteOrder: builder.mutation({
      query: (id:string) => {
        return {
          url: `/order/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags:["order"]
    }),
    
  }),
});

export const {
  useGetAllOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation

} = orderApi;
