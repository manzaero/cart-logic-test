import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, type RootState, type AppDispatch } from '../../store';
import { useParams, useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

const Input = styled.input.attrs({
    type: 'text',
})`
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

const Wrapper = styled.div`
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
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

export const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const product = useSelector((state: RootState) =>
        state.products.products.find(p => p.id === Number(id))
    ) as Product | undefined;
    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price?.toString() || '');
    const [description, setDescription] = useState(product?.description || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!product) {
            setError('Продукт не найден');
        } else {
            setName(product.name);
            setPrice(product.price.toString());
            setDescription(product.description || '');
        }
    }, [product]);

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

        dispatch(
            editProduct({
                id: Number(id),
                name: name.trim(),
                price: priceValue,
                description: description.trim(),
            })
        );
        navigate('/');
    };

    if (!product && !error) {
        return <Wrapper><Error>Продукт не найден</Error></Wrapper>;
    }

    return (
        <Wrapper>
            <h2>Редактировать продукт</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="Название"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
                <Input
                    placeholder="Цена"
                    value={price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                />
                <TextArea
                    placeholder="Описание"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                />
                {error && <Error>{error}</Error>}
                <Button type="submit">Сохранить</Button>
            </form>
        </Wrapper>
    );
};