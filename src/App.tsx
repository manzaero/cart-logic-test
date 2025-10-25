import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {CreateProduct, EditProduct, Main, ProductPage,} from "./pages";

export const App: React.FC = () => {
    return (
        <Router basename="/cart-logic-test">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/create-product" element={<CreateProduct title="Создать продукт" />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
            </Routes>
        </Router>
    );
};
