import styles from "./testimonialForm.module.css";
import z, { includes } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, { error: "Enter Your Name" }),
  description: z.string().min(1, { error: "Enter Description" }),
  status: z.boolean().transform((val) => (val ? "A" : "I")),
  image: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed",
  }),
});

function TestimonialForm() {

  const [selectedImg, setSelectedImg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImage = (input) => {
    const File = input.target.files[0];

    const fileTypes = ["image/png","image/jpeg","image/gif"];

    const fileType = File.type
    
    if (fileTypes.includes(fileType)) {
      
      setSelectedImg(URL.createObjectURL(File))
      setValue("image", File);

    }
    else{
      window.alert("Please Selected : Png, Jpeg, Gif Image File Type");
    }



    console.log(input.target.files[0]);
  };

  return (
    <div className="container mt-4">
      <div className={styles.header}>
        <h2 className="text-center">Testimonials Form</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" {...register("name")} />
          {errors.name && <p>{errors.name.error}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            {...register("description")}
          />
          {errors.description && <p>{errors.description.error}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Click to upload</label>
          <div className="d-flex justify-content-between align-items-start">
            <input type="file" className="form-control w-50" onChange={handleImage} />
          {selectedImg && (
            <img style={{objectFit: "contain", height: "100%", borderRadius: "6px"}} src={selectedImg} alt="Img" height={200} width={300}/>
          )}
          </div>
          {errors.image && <p>{errors.image.error}</p>}
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            {...register("status")}
          />
          {errors.status && <p>{errors.name.status}</p>}
          <label className="form-check-label">Status-Inactive</label>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TestimonialForm;
