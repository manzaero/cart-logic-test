import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProductCard } from '../product-card/product-card';

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

interface CardProps {
    title: string;
    products?: Product[];
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

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${({ active }) => (active ? '#333' : '#ccc')};
  background-color: ${({ active }) => (active ? '#ddd' : '#f9f9f9')};
  cursor: pointer;
`;

export const Card: React.FC<CardProps> = ({ title, products = [] }) => {
    const [productList, setProductList] = useState(products);
    const [likedIds, setLikedIds] = useState<number[]>(() => {
        const saved = localStorage.getItem('likedIds');
        return saved ? JSON.parse(saved) : [];
    });
    const [filter, setFilter] = useState<'all' | 'favorites'>('all');

    useEffect(() => {
        setProductList(products);
    }, [products]);

    useEffect(() => {
        localStorage.setItem('likedIds', JSON.stringify(likedIds));
    }, [likedIds]);

    const handleDelete = (id: number) => {
        setProductList(prev => prev.filter(p => p.id !== id));
    };

    const handleToggleLike = (id: number) => {
        setLikedIds(prev =>
            prev.includes(id) ? prev.filter(likeId => likeId !== id) : [...prev, id]
        );
    };

    const displayedProducts =
        filter === 'favorites'
            ? productList.filter(p => likedIds.includes(p.id))
            : productList;

    return (
        <CardWrapper>
            <h3>{title}</h3>
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
                            key={product.id}
                            product={product}
                            liked={likedIds.includes(product.id)}
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
