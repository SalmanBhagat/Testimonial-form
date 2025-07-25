import styles from "./testimonialForm.module.css";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, { error: "Enter Your Name" }),
  description: z.string().min(1, { error: "Enter Description" }),
  status: z.boolean().transform((val) => (val ? "A" : "I")),
  image: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed",
  }),
});

function TestimonialForm() {
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
    setValue("image", input.target.files[0]);
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
          <input type="file" className="form-control" onChange={handleImage} />
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
