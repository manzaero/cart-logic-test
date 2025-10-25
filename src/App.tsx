import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    Main,
    CreateProductPage,
    ProductPage,
    EditPage
} from "./pages";

export const App: React.FC = () => {
    return (
        <Router basename="/cart-logic-test">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/create-product" element={<CreateProductPage/>} />
                <Route path="/edit-product/:id" element={<EditPage />} />
            </Routes>
        </Router>
    );
};
