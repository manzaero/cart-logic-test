import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch, addToCart, removeFromCart, removeProduct, type Product } from '../../store';
import { ProductCard } from '../product-card/product-card';

interface CardProps {
    name: string;
    products: Product[];
}

const CardWrapper = styled.div`
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProductsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const FilterButtons = styled.div`
    margin-bottom: 12px;
    display: flex;
    gap: 10px;
`;

const FilterButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid ${({ active }) => (active ? '#333' : '#ccc')};
    background-color: ${({ active }) => (active ? '#ddd' : '#f9f9f9')};
    cursor: pointer;
`;

export const Card: React.FC<CardProps> = ({ name, products }) => {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.products.cart) || [];
    const [filter, setFilter] = useState<'all' | 'favorites'>('all');

    const displayedProducts =
        filter === 'favorites'
            ? products.filter(p => cart.some(item => item.id === p.id))
            : products;

    const handleDelete = (id: number) => {
        dispatch(removeProduct(id));
    };

    const handleToggleLike = (id: number) => {
        const product = products.find(p => p.id === id);
        if (product) {
            dispatch(
                cart.some(item => item.id === id)
                    ? removeFromCart(product.id)
                    : addToCart(product)
            );
        }
    };

    return (
        <CardWrapper>
            <h3>{name}</h3>
            <FilterButtons>
                <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
                    Все
                </FilterButton>
                <FilterButton
                    active={filter === 'favorites'}
                    onClick={() => setFilter('favorites')}
                >
                    Избранные
                </FilterButton>
            </FilterButtons>
            <ProductsGrid>
                {displayedProducts.length > 0 ? (
                    displayedProducts.map(product => (
                        <ProductCard
                            key={product.id.toString()}
                            product={product}
                            liked={cart.some(item => item.id === product.id)}
                            onDelete={handleDelete}
                            onToggleLike={handleToggleLike}
                        />
                    ))
                ) : (
                    <p>Нет продуктов для отображения</p>
                )}
            </ProductsGrid>
        </CardWrapper>
    );
};