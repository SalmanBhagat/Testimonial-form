import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function TestimonialList() {
  const [open, setOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")

  // const testimonials = [
  //   {
  //     id: 1,
  //     name: "Test seo title",
  //     description: "fdsfdsf Test Desc cate seo",
  //     image_full_url:
  //       "https://png.pngtree.com/background/20230524/original/pngtree-3d-concept-art-animation-for-social-media-picture-image_2711567.jpg",
  //     created_at: "August 14, 2023 09:37 AM",
  //   },
  //   {
  //     id: 2,
  //     name: "Test seo title",
  //     description: "fdsfdsf Test Desc cate seo",
  //     image_full_url:
  //       "https://img.freepik.com/premium-photo/3d-cartoon-character-developer-working-laptop-web-app-development-frontend-deployment_1298309-24594.jpg",
  //     created_at: "August 14, 2023 09:37 AM",
  //   },
  //   {
  //     id: 3,
  //     name: "Another Testimonial",
  //     description: "Sample description for demo use.",
  //     image_full_url:
  //       "https://img.freepik.com/free-psd/business-people-discussing-documents-ideas-meeting-with-smartphone-isolated-background-businesswoman-having-idea-business-technology-concept-3d-render-cartoon-character_1150-61993.jpg?semt=ais_hybrid&w=740",
  //     created_at: "August 14, 2023 09:37 AM",
  //   },
  // ];

  useEffect(() => {
    setLoading(true);
    axios
      .post("https://car-parking.emaadinfotech.in/api/testimonial-data", {
        sort_order: "DESC",
        search_filed: search,
        limit_per_page: "10",
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.status == "success") {
          setTestimonials(res.data.data.data || []);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [search]);

  return (
    <div>
      <div className="container my-5">
        <h2 className="text-center mb-4">Testimonials list</h2>
        {/* Search input */}
          <div className="mb-3">
          <input
          onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </div>
        {/* Loader Show*/}
        <div className="position-absolute top-50 start-50 translate-middle">
          {loading && <ClipLoader color="#148f84" size={150} />}
        </div>
        {/* Data No Found */}
        {testimonials?.length == 0 && <h4 className="text-center fs-1 text-danger">Data Not Found!</h4>}
        <div className="row g-4">
          {testimonials.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card border-0 h-100 shadow-sm">
                <img
                  src={item.image_full_url}
                  className="card-img-top"
                  alt={item.name}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
                <div className="card-footer text-muted border-top-0">
                  {item.created_at}
                </div>
                <div className="card-footer bg-white border-top-0">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setOpen(true)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <div style={{ width: "60%", margin: "auto" }}>
          <div className="card h-100 shadow-sm">
            <img
              src="https://img.freepik.com/free-vector/isometric-feedback-landing-page-template_23-2148955897.jpg?semt=ais_hybrid&w=740"
              className="card-img-top"
              alt="Test seo title"
              style={{
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">Test seo title</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Sapiente qui neque rerum laboriosam iure provident! In accusamus
                aspernatur quae sit officiis omnis beatae! Natus dolores a nobis
                aliquid ratione? Cum.
              </p>
            </div>
            <div className="card-footer text-muted border-top-0">
              August 14, 2023 09:37 AM
            </div>
            <div className="card-footer bg-white border-top-0">
              <button
                className="btn btn-primary w-100"
                onClick={() => setOpen(true)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TestimonialList;
