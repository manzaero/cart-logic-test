import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
`;

export const CreateProduct: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !price.trim()) {
            setError('Все поля обязательны');
            return;
        }
        const priceValue = Number(price);
        if (isNaN(priceValue) || priceValue <= 0) {
            setError('Цена должна быть положительным числом');
            return;
        }

        dispatch(addProduct({
            id: Date.now(),
            name,
            price: priceValue,
            description
        }));

        navigate('/');
    };

    return (
        <Wrapper>
            <h2>Создать продукт</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="Название"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    placeholder="Цена"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <TextArea
                    placeholder="Описание"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                {error && <Error>{error}</Error>}
                <Button type="submit">Создать</Button>
            </form>
        </Wrapper>
    );
};
