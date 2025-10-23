import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { useParams, useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`;

export const EditProduct: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector((state: RootState) =>
        state.products.find(p => p.id === Number(id))
    );

    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price.toString() || '');
    const [description, setDescription] = useState(product?.description || '');

    const handleSave = () => {
        dispatch({
            type: 'products/editProduct',
            payload: { id: Number(id), name, price: Number(price), description },
        });
        navigate('/');
    };

    return (
        <Wrapper>
            <h2>Редактировать продукт</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Название" />
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Цена" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" />
            <button onClick={handleSave}>Сохранить</button>
        </Wrapper>
    );
};
