import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
`;
const Title = styled.h4`
  margin-bottom: 8px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  height: 2.8em;
`;

export const ProductPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const products = useSelector((state: RootState) => state.products);
    const product = products.find(p => p.id === Number(id));

    if (!product) return <Wrapper>Продукт не найден</Wrapper>;

    return (
        <Wrapper>
            <Title>{product.name}</Title>
            <p><b>Цена:</b> ${product.price}</p>
            <p><b>Описание:</b> {product.description || 'Описание отсутствует'}</p>
            <Button onClick={() => navigate('/')}>Назад</Button>
        </Wrapper>
    );
};
