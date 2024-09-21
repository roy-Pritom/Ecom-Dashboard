import { Form, Input, Button, Row, Col,  Image, Checkbox } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Home } from "lucide-react";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

import { useGetSingleProductQuery, useUpdateProductMutation } from "../../redux/features/ProductApi/productApi";
// import { modifyPayload } from "../../Utlis/modifyPayload";
import { useParams } from "react-router-dom";
// import { modifyPayload } from "../../Utlis/modifyPayload";

const UpdateProduct = () => {
  const { id } = useParams();
  const [deleteImages, setDeleteImages] = useState([])
  // console.log(deleteImages);
  const { control, handleSubmit, reset, setValue, getValues } = useForm();
  // const [fileList, setFileList] = useState<any[]>([]);

  const [updateProduct] = useUpdateProductMutation();
  const { data: productInfo, isLoading } = useGetSingleProductQuery(id);
  const product = productInfo?.data;
  // console.log(product);

  // const handleUploadChange = ({ fileList }: any) => {
  //   setFileList(fileList);
  // };

  const onSubmit = async (data: FieldValues) => {
    const values = {
      name: data.name,
      price: parseFloat(data.price),
      discount: Number(data.discount),
      stock: Number(data.stock),
      description: data.description,
      details: data.details,
      // categoryId: data.categoryId,
      colors: data.colors || [],
      sizes: data.sizes || [],
      images: {
        // crate:[
        //   {
        //     img:fileList?.map()
        //   }
        // ],
        delete: deleteImages
          
      }

    };
    const productData = {
      id,
      data: values
    }
    // console.log(productData);

    // formData.append('file',data.profileImg);
    // const formData = modifyPayload(productData);
    try {
      const res = await updateProduct(productData);
      console.log("Product updates successfully:", res);
      reset(); // Clear form and file list after successful submission
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleColorChange = (value: string) => {
    const colorArray = value.split(",").map((color) => color.trim());
    setValue("colors", colorArray); // Update the form value to always be an array
  };
  const handleSizeChange = (value: string) => {
    const sizeArray = value.split(",").map((size) => size.trim());
    setValue("sizes", sizeArray); // Update the form value to always be an array
  };

  const handleToggleDelete = (imgUrl:any) => {
    setDeleteImages((prev:any) => {
      // Check if the image is already in the delete list
      const isAlreadyDeleted = prev.some((img:any) => img.img === imgUrl);

      // If already marked for deletion, remove it; otherwise, add it
      if (isAlreadyDeleted) {
        return prev.filter((img:any) => img.img !== imgUrl);
      } else {
        return [...prev, { img: imgUrl }];
      }
    });
  };
  return (
    <div className="p-5">
      {
        isLoading ?
          <>
            <p>Loading...</p>
          </>
          :
          <>
            <div>
              <h1 className="text-slate-800 text-lg">Edit Product</h1>
            </div>
            <div>
              <Form
                onFinish={handleSubmit(onSubmit)}
                name="form_item_path"
                layout="vertical"
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={8}>
                    <Form.Item name="name" label="Product Name">
                      <Controller
                        name="name"
                        control={control}
                        defaultValue={product?.name}
                        render={({ field }) => (
                          <Input {...field} placeholder="Enter product name..." />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item name="colors" label="Product Color">
                      <Controller
                        name="colors"
                        control={control}
                        defaultValue={product?.colors}
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={getValues("colors")?.join(",")} // Display the array as a comma-separated string
                            onChange={(e) => handleColorChange(e.target.value)} // Handle transformation on input change
                            placeholder="Enter colors, e.g., red, blue, green"
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item name="sizes" label="Size">
                      <Controller
                        name="sizes"
                        control={control}
                        defaultValue={product?.sizes}
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={getValues("sizes")?.join(",")} // Display the array as a comma-separated string
                            onChange={(e) => handleSizeChange(e.target.value)} // Handle transformation on input change
                            placeholder="Enter size"
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>


                  {/* <Col xs={24} sm={8}>
              <Form.Item name="categoryId" label="Product Category">
                <Controller
                  name="categoryId"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      style={{ width: "100%" }}
                      placeholder="Select Category"
                      options={categoryFilterData}
                      onChange={(value) => field.onChange(value)}
                      optionLabelProp="label"
                    >
                      {categoryFilterData.map((option: any) => (
                        <Select.Option key={option.value} value={option.value}>
                          <Space>
                            <span
                              style={{
                                display: "inline-block",
                                width: "15px",
                                height: "15px",
                                backgroundColor: option.value,
                                border: "1px solid #000",
                                marginRight: "8px",
                              }}
                            />
                            <span style={{ color: option.value }}>
                              {option.label}
                            </span>
                          </Space>
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col> */}

                  <Col xs={24} sm={8}>
                    <Form.Item name="price" label="Product Price">
                      <Controller
                        name="price"
                        control={control}
                        defaultValue={product?.price}
                        render={({ field }) => (
                          <Input {...field} placeholder="Enter product Price..." />
                        )}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Form.Item name="discount" label="Product Discount">
                      <Controller
                        name="discount"
                        control={control}
                        defaultValue={product?.discount}
                        render={({ field }) => (
                          <Input {...field} placeholder="Enter product Discount..." />
                        )}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Form.Item name="stock" label="Product Stock">
                      <Controller
                        name="stock"
                        control={control}
                        defaultValue={product?.stock}
                        render={({ field }) => (
                          <Input {...field} placeholder="Enter product Stock..." />
                        )}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Form.Item name="description" label="Product Description">
                      <Controller
                        name="description"
                        control={control}
                        defaultValue={product?.description}
                        render={({ field }) => (
                          <TextArea
                            rows={3}
                            {...field}
                            placeholder="Enter product Description..."
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Form.Item name="details" label="Product Details">
                      <Controller
                        name="details"
                        control={control}
                        defaultValue={product?.details}
                        render={({ field }) => (
                          <TextArea
                            rows={3}
                            {...field}
                            placeholder="Enter product Details..."
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
{/* 
                  <Col xs={24} sm={12}>
                    <Button>ADD</Button>
                    <Form.Item label="Product Images">
                      <Controller
                        name="file"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                          <Upload
                            {...field}
                            multiple
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            beforeUpload={() => false} // Prevent automatic upload
                          >
                            {fileList.length < 5 && (
                              <div>
                                <Upload />
                                <div style={{ marginTop: 8 }}>Upload</div>
                              </div>
                            )}
                          </Upload>
                        )}
                      />
                    </Form.Item>
                  </Col> */}

                  <Col xs={24} sm={12}>
                    <Button>Delete Images</Button>
                    <Form.Item label="Product Images">
                      <div className={`${product?.images?.length > 1 && 'grid gird-cols-3'} `}>
                        {
                          product?.images?.map((img: any) =>
                            <table>
                              <td>
                                <Image className="rounded-lg w-32 h-20" key={img?.img} src={img?.img} />
                              </td>
                              <td>
                                <Button className="bg-red-400" onClick={() => handleToggleDelete(img.img)}>
                                <Checkbox  checked={deleteImages.some((i:any) => i.img === img.img)}/>
                                </Button>
                              </td>
                            </table>
                          )
                        }
                      </div>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item className=" ">
                  <div className=" w-1/2 mx-auto flex justify-center gap-12">
                    <Button
                      className="w-full flex items-center justify-center gap-3 bg-red-500 text-white"
                      htmlType="button"
                      onClick={() => { /* Navigate back home */ }}
                    >
                      Back Home <Home size={16} />
                    </Button>
                    <Button className="w-full" type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </>
      }

    </div>
  );
};

export default UpdateProduct;

