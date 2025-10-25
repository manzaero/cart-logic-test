import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts, type AppDispatch } from '../store';

export const useProductsLoader = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const saved = localStorage.getItem('products');

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    dispatch(setProducts(parsed));
                    return;
                }
            } catch {
                console.warn('Ошибка при чтении products из localStorage');
            }
        }

        const fetchProducts = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                const data = await res.json();

                const cleaned = data.map((p: {
                    id: number;
                    title: string;
                    price: number;
                    description: string;
                }) => ({
                    id: p.id,
                    name: p.title,
                    price: p.price,
                    description: p.description,
                }));

                dispatch(setProducts(cleaned));
            } catch (err) {
                console.error('Ошибка при загрузке продуктов:', err);
            }
        };

        fetchProducts();
    }, [dispatch]);
};
