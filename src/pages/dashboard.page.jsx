import React from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import useForm from '../hooks/useForm';
import { useCreateProductMutation } from '../app/apiSlice';
function Dashboard() {
    const [createProduct,{data}] = useCreateProductMutation();
    const initialValues = {
        name: "",
        price: "",
        description: "",
        stock: 0,
        category:"",
        image:""
    };
    const validationRules = {
        name: { required: true },
        price: {
          required: true,
        },
        description: {
          required: true,
        },
        category:{ required: true },
        stock: { required: true },
        image: { required: true}
    };
    const { values, errors, handleChange, handleSubmit } = useForm(
        initialValues,
        validationRules
    );

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('naame', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('stock', data.stock);
        formData.append('image', data.image);
        createProduct(formData);
    };

    console.log({data});
  return (
    <div className='flex justify-center bg-white'>
        <h2>Create Product</h2>
        <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <InputField
                id="name"
                label="Name*"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Product name"
            />
            <InputField
                id="price"
                label="Price*"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                error={errors.price}
                placeholder="Product Price"
            />
            <InputField
                id="description"
                label="Description*"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                error={errors.description}
                placeholder="Product description"
            />
            <InputField
                id="category"
                label="Category*"
                type="text"
                name="category"
                value={values.category}
                onChange={handleChange}
                error={errors.category}
                placeholder="Product category"
            />
            <InputField
                id="stock"
                label="Stock*"
                type="number"
                name="stock"
                value={values.stock}
                onChange={handleChange}
                error={errors.stock}
                placeholder="Product stock"
            />
            <InputField
                id="image"
                label="ProductImage*"
                type="file"
                name="image"
                value={values.image}
                onChange={handleChange}
                error={errors.image}
                placeholder="Product image"
            />
            <Button type='submit'>Create Product</Button>
      </form>
    </div>
  )
}

export default Dashboard