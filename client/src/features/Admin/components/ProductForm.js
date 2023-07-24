import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchSingleProductAsync,
  selectAllBrands,
  selectAllCategories,
  selectSingleProduct,
  updateProductAsync,
} from "../../product/ProductSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import DeleteModal from "../../common/DeleteModal";
import { toast } from "react-hot-toast";

export default function ProductForm() {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectAllBrands);
  const category = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectSingleProduct);
  const [openModal, setOpenModal] = useState(null);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    toast.error("This Product is Deleted!");
    dispatch(updateProductAsync(product));
  };

  useEffect(() => {
    if (params.id) {
      dispatch(fetchSingleProductAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);

      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("price", selectedProduct.price);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
    }
  }, [selectedProduct, setValue, params.id]);

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
          const product = { ...data };
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];
          product.price = +product.price;
          product.discountPercentage = +product.discountPercentage;
          product.stock = +product.stock;

          product.rating = 0;
          delete product["image1"];
          delete product["image2"];
          delete product["image3"];

          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product));
            reset();
          } else {
            dispatch(createProductAsync(product));
            reset();
          }
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-2 border-solid m-5 p-6 border-gray-900/10 pb-12">
            <h2 className="flex text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="Product Name"
                  className="flex text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="text"
                      {...register("title", {
                        required: "title is required",
                      })}
                      id="title"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Product Name"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="Description"
                  className="flex text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="number"
                      {...register("price", {
                        required: "price is required",
                        min: 1,
                        max: 10000,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="number"
                      {...register("discountPercentage", {
                        required: "discountPercentage is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="number"
                      {...register("stock", {
                        required: "Stock is required",
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="flex text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* //Images */}
              <div className="sm:col-span-6">
                <label
                  htmlFor="image1"
                  className="flex text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="text"
                      {...register("image1", {
                        required: "image1 is required",
                      })}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="flex text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="text"
                      {...register("image2", {
                        required: "image2 is required",
                      })}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="image3"
                  className="flex text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="text"
                      {...register("image3", {
                        required: "image3 is required",
                      })}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="flex text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm  ring-gray-300  focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select
                      {...register("brand", {
                        required: "Brand is required",
                      })}
                    >
                      <option value="">---Choose Brand---</option>
                      {brands.map((brand) => {
                        return (
                          <option key={brand.value} value={brand.value}>
                            {brand.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="flex text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm  ring-gray-300  focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <select
                      {...register("category", {
                        required: "category is required",
                      })}
                    >
                      <option value="">---Choose Category---</option>
                      {category.map((categories) => {
                        return (
                          <option
                            key={categories.value}
                            value={categories.value}
                          >
                            {categories.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {selectedProduct && !selectedProduct.deleted && (
              <button
                className=" px-5 py-2 bg-red-500 dark:bg-gray-100 rounded-full text-gray-200 dark:text-gray-700 font-semibold hover:bg-red-600 dark:hover:bg-white hover:text-gray-100 dark:hover:text-gray-800 focus:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(true);
                }}
              >
                Delete
              </button>
            )}
            <button
              type="button"
              className=" rounded-full px-5 py-2 text-gray-200 bg-gray-500 font-semibold leading-6 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" bg-indigo-600 px-5 py-2 text-gray-200 font-semibold  shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-full"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      {selectedProduct && (
        <DeleteModal
          title={`Deleting ${selectedProduct.title} `}
          message="Are you sure you want to Delete this Product?"
          deleteOption="Remove this Product"
          cancelOption="Cancel"
          handleAction={handleDelete}
          showModal={openModal}
          cancelAction={() => setOpenModal(null)}
        ></DeleteModal>
      )}
    </>
  );
}
