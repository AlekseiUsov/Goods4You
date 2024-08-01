// router
import { Route, Routes } from "react-router-dom";
// pages
import { Cart, Catalog, Login, NotFound, Product } from "../pages";
// protectedRoute
import { ProtectedRoute } from "../components";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<Catalog />} />} />
      <Route
        path="/product/:id"
        element={<ProtectedRoute element={<Product />} />}
      />
      <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
      <Route
        path="/login"
        element={<ProtectedRoute unAuth element={<Login />} />}
      />
      <Route path="*" element={<ProtectedRoute element={<NotFound />} />} />
    </Routes>
  );
};
