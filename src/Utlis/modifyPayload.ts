// Updated modifyPayload function
export const modifyPayload = (values: any) => {
    const obj = { ...values };
    const formData = new FormData();
  
    // Remove the 'file' field from the object to only have data fields
    const { file, ...dataWithoutFiles } = obj;
  
    // Convert data fields to JSON string and append to formData
    formData.append("data", JSON.stringify(dataWithoutFiles));
  
    // Check if 'file' is an array (i.e., multiple files uploaded)
    if (Array.isArray(file)) {
      file.forEach((fileItem: any) => {
        formData.append("file", fileItem.originFileObj); // Append files with key "files[]"
      });
    }
  
    return formData;
  };
  