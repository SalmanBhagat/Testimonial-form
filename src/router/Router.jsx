import { createBrowserRouter } from "react-router-dom";
import TestimonialForm from "../testimonial/TestimonialForm";


const routing = createBrowserRouter([
    {path: "/", element: <TestimonialForm/>},
    {path: "/form", element: <TestimonialForm/>},
])

export default routing