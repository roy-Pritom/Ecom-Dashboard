import { Button, Input, Space, Table, TableColumnsType, Tag } from "antd";
// import moment from "moment";
import { useEffect, useState } from "react";
import { useDeleteOrderMutation, useGetAllOrderQuery, useUpdateOrderMutation } from "../../redux/features/OrderApi/OrderApi";
import moment from "moment";
import { Trash2 } from "lucide-react";

const OrderProducts = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilterId, setCategoryFilterId] = useState<string>("");

  //Search and Filtering Start
  useEffect(() => {
    if (searchTerm.length > 0) {
      setCategoryFilterId("");
    }
  }, [searchTerm]);

  const query: Record<string, any> = {
    searchTerm,
  };

  if (!searchTerm.length) {
    if (categoryFilterId) query["categoryId"] = categoryFilterId;
  }

  //End
  const { data: orderQueryData, isFetching } = useGetAllOrderQuery(query);
  const [updateOrder]=useUpdateOrderMutation();
  const [deleteOrder]=useDeleteOrderMutation();
   

  if (isFetching) {
    console.log("Loading...");
  }
  const orderData = orderQueryData?.data || [];
  // console.log(orderData);
  const orderTableData = orderData?.map(
    (order: any) => ({
      key: order?.id,
      id:order?.id,
      orderId:order?.orderId,
      name:order?.order?.name,
      address:order?.order?.address,
      contact:order?.order?.contact,
      product:order?.product?.name,
      totalPrice:order?.order?.totalPrice,
      status:order?.order?.status,
      // colors: colors.map((color: any) => color.color).join(", "), 
      createdAt: moment(new Date(order?.createdAt)).format("MMM Do YY"),
    })
  );

  const handleUpdate=async(orderId:string,values:string)=>{
     const orderData={
      id:orderId,
      data:{
        status:values
      }
     }
     const res=await updateOrder(orderData);
     console.log(res);
  }
  const handleDelete=async(orderProductId:string)=>{
    console.log(orderProductId);
     const res=await deleteOrder(orderProductId);
     console.log(res);
  }

  const columns: TableColumnsType<any> = [
    
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Product Name",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render:(status)=>(
        <Tag color={`${status === 'rejected' ? 'red' : 'green'}`}>{status}</Tag>
      )
    },
    
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title:"Action",
      key:"action",
      render:(item)=>(
        <Space>
          <Button className={`bg-green-400 ${item?.status==="accepted" ? "hidden" : "block" }`} onClick={()=>handleUpdate(item?.orderId,'accepted')} > Accept </Button>
          <Button onClick={()=>handleUpdate(item?.orderId,'rejected')} 
            className={`bg-red-400 ${item?.status==="rejected" ? "hidden" : "block" }`}
            > Reject </Button>
            <Button className="bg-red-500" onClick={()=>handleDelete(item?.id)}>
            <Trash2 className="w-5 h-5  text-white"/>
              </Button>
        </Space>
      )
    }
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (item) => (
    //     <Space>
    //       <Link to={`/ADMIN/update/${item.id}`}>
    //         <Button>
    //           <Pencil size={20} />
    //         </Button>
    //       </Link>
    //       <Link to={`/ADMIN/product/${item.id}`}>
    //         <Button>
    //           <Eye size={20} />
    //         </Button>
    //       </Link>
    //       <Button type="primary" danger>
    //         <Trash2 size={20} />
    //       </Button>
    //     </Space>
    //   ),
    //   width: "1%",
    // },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="p-5">
      <div className="flex gap-16">
        <Input
          placeholder="Search Product..."
          className="w-40"
          value={searchTerm}
          onChange={handleSearch}
        />
        
      </div>
      <div>
        <div className="pt-8">
          <Table
            loading={isFetching}
            columns={columns}
            dataSource={orderTableData}
            pagination={{ defaultPageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderProducts;
