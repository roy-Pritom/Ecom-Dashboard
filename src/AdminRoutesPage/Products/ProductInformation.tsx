import { Button, Image, Input, Select, Space, Table, TableColumnsType } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDeleteProductMutation, useGetAllProductQuery } from "../../redux/features/ProductApi/productApi";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetAllCategoryQuery } from "../../redux/features/CategoryApi/categoryApi";
import { toast } from "sonner";

const ProductInformation = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilterId, setCategoryFilterId] = useState<string>("");
  const [deleteProduct]=useDeleteProductMutation();
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
  const { data: productQueryData, isFetching } = useGetAllProductQuery(query);
  const { data: categoryData } = useGetAllCategoryQuery({});
  const filterData = categoryData?.data?.data || [];

  const categoryFilterData = [
    { value: "", label: "Clear" },
    ...filterData.map((data: any) => ({
      value: data.id,
      label: data.name,
    })),
  ];

  if (isFetching) {
    console.log("Loading...");
  }
  const productData = productQueryData?.data?.data || [];
// console.log(productData);
  const productTableData = productData?.map(
    ({
      id,
      name,
      images,
      sizes,
      colors,
      price,
      discount,
      stock,

      createdAt,
    }: any) => ({
      key: id,
      id,
      name,
      img: images[0]?.img || "N/A", // Get the first image
      sizes: sizes,
      colors: colors,
      price,
      discount,
      stock,
      createdAt: moment(new Date(createdAt)).format("MMM Do YY"),
    })
  );



const handleDelete=async(id:string)=>{
  const toastId=toast.loading('processing')
  try{
     const res:any=await deleteProduct(id);
    // console.log(res);
    if(res?.data?.success===true){
      toast.success('Product deleted successfully',{id:toastId,duration:1000})
    }
    else{
      toast.error('Something went wrong',{id:toastId,duration:1000})
    }
  }catch(error:any){
toast.error('processing',{id:toastId,duration:1000})
  }
}

  const columns: TableColumnsType<any> = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      render: (img: string) => (
        <Image
          src={img}
          alt="Product"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Sizes",
      dataIndex: "sizes",
      key: "sizes",
      render:(sizes:string[])=>(
        <Select
        defaultValue={sizes[0]}
        style={{ width: 120 }}
        options={sizes.map((size) => ({ label: size, value: size }))}
      />
  
      )
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
      render:(colors:string[])=>(
        <Select
        defaultValue={colors[0]}
        style={{ width: 120 }}
        options={colors.map((color) => ({ label: color, value: color }))}
      />
  
      )
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space>
          <Link to={`/ADMIN/update/${item.id}`}>
            <Button>
              <Pencil size={20} />
            </Button>
          </Link>
          <Link to={`/ADMIN/product/${item.id}`}>
            <Button>
              <Eye size={20} />
            </Button>
          </Link>
          <Button onClick={()=>handleDelete(item?.id)} type="primary" danger>
            <Trash2 size={20} />
          </Button>
        </Space>
      ),
      width: "1%",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleCategoryChange = (value: string) => {
    setCategoryFilterId(value);
  };


  return (
    <div className="p-5">
      <div className="flex gap-16">
        <Link to={"/ADMIN/createProduct"}>
          <Button type="primary">Create New Product</Button>
        </Link>
        <Input
          placeholder="Search Product..."
          className="w-40"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select
          className="w-40"
          showSearch
          placeholder="Select a person"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          value={categoryFilterId}
          onChange={handleCategoryChange}
          options={categoryFilterData}
        />
      </div>
      <div>
        <div className="pt-8">
          <Table
            loading={isFetching}
            columns={columns}
            dataSource={productTableData}
            pagination={{ defaultPageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
