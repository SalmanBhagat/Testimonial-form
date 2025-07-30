import styles from "./testimonialForm.module.css";
import z, { includes } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

const schema = z.object({
  name: z.string().min(1, { message: "Enter Your Name" }),
  description: z.string().min(1, { message: "Enter Description" }),
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
    watch,
  } = useForm({ resolver: zodResolver(schema) });

  const formAPI = "https://car-parking.emaadinfotech.in/api/testimonial-save"

  
  const onSubmit = (data) => {

    const formData = new FormData();
    formData.append("name",data.name),
    formData.append("description",data.description),
    formData.append("image",data.image),
    formData.append("status",data.status),
    
    axios.post(formAPI, formData).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })

    console.log(data);
  };

  const handleImage = (input) => {
    const File = input.target.files[0];

    const fileTypes = ["image/png","image/jpeg","image/gif"];

    // const fileType = File.type
    
    if (fileTypes.includes(File.type)) {
      
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
          {errors.name && <p className="text-danger mt-2">{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            {...register("description")}
          />
          {errors.description && <p className="text-danger mt-2">{errors.description.message}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Click to upload</label>
          <div className="d-flex justify-content-between align-items-start gap-4">
            <input type="file" className="form-control w-50" onChange={handleImage} />
          {selectedImg && (
            <img style={{objectFit: "contain", height: "100%", borderRadius: "6px", flex: "1", minWidth: "200px"}} src={selectedImg} alt="Img" height={200} />
          )}
          </div>
          {errors.image && <p className="text-danger mt-2">{errors.image.message}</p>}
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            {...register("status")}
          />
          {errors.status && <p>{errors.name.status}</p>}
          <label className="form-check-label">Status - {watch("status") ? "Active" : "Inactive"}</label>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Send
        </button>
      </form>
    </div>
  );
}

export default TestimonialForm;
