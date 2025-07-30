import { createBrowserRouter } from "react-router-dom";
import TestimonialForm from "../testimonial form/TestimonialForm";
import TestimonialList from "../testimonial list/TestimonialList";


const routing = createBrowserRouter([
    {path: "/", element: <TestimonialForm/>},
    {path: "/form", element: <TestimonialForm/>},
    {path: "/list", element: <TestimonialList/>},
])

export default routing