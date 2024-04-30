import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
// function ProductForm({product}) {

//   return    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//   <div className="w-2/3 px-2">
//     <Input
//       label="Title :"
//       placeholder="Title"
//       className="mb-4  bg-gray-200"
//       {...register("title", { required: true })}
//     />
//     <Input
//       label="Description :"
//       placeholder="Description"
//       className="mb-4  bg-gray-200"
//       {...register("description", { required: true })}
//     //   onInput={(e) => {
//     //     setValue("description", slugTransform(e.currentTarget.value), {
//     //       shouldValidate: true,
//     //     });
//     //   }}
//     />

//   </div>
//   <div className="w-1/3 px-2">
//     <Input
//       label="Product Image :"
//       type="file"
//       className="mb-4 bg-gray-200"
//       accept="image/png, image/jpg, image/jpeg, image/gif"
//       {...register("image", { required: !product })}
//     />
//     {product && (
//     //   <div className="w-full mb-4">
//     //     <img
//     //       src={bucketService.getImagePreview(post.featuredImage)}
//     //       alt={post.title}
//     //       className="rounded-lg"
//     //     />
//     //   </div>
//     )}
//     <Select
//       options={["active", "inactive"]}
//       label="Status"
//       className="mb-4 bg-gray-500"
//       {...register("status", { required: true })}
//     />
//     <Button
//       type="submit"
//       bgColor={post ? "bg-green-500" : undefined}
//       className="w-full"
//     >
//       {post ? "Update" : "Submit"}
//     </Button>
//   </div>
// </form>
// }

// export default ProductForm;
