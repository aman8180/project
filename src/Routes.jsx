import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Login from "pages/login";
import ShoppingCart from "pages/shopping-cart";
import Dashboard from "pages/dashboard";
import Register from "pages/register";
import Checkout from "pages/checkout";
import ProductCatalog from "pages/product-catalog";
import OrderConfirmation from "pages/order-confirmation";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;