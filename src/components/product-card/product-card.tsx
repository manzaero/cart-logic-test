import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

interface ProductCardProps {
    product: Product;
    onDelete: (id: number) => void;
    onToggleLike: (id: number) => void;
    liked: boolean;
}

const EditButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e6e6e6;
  }

  &:active {
    transform: scale(0.97);
  }
`;

const CardContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  width: 300px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  height: 220px;
  &:hover {
    transform: translateY(-2px);
  }
`;

const Text = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
`;

const Button = styled.button<{ active?: boolean }>`
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid ${({ active }) => (active ? 'red' : '#ccc')};
  background-color: ${({ active }) => (active ? '#ffe6e6' : '#f5f5f5')};
  color: ${({ active }) => (active ? 'red' : '#333')};
  cursor: pointer;
`;

export const ProductCard: React.FC<ProductCardProps> = ({
                                                            product,
                                                            onDelete,
                                                            onToggleLike,
                                                            liked
                                                        }) => {
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON') return;
        navigate(`/products/${product.id}`);
    };

    return (
        <CardContainer onClick={handleCardClick}>
            <h4>{product.name}</h4>
            <Text>{product.description || 'Описание отсутствует'}</Text>
            <p>${product.price}</p>
            <ButtonsWrapper>
                <Button active={liked} onClick={() => onToggleLike(product.id)}>
                    {liked ? 'дизлайк' : 'лайк'}
                </Button>
                <Button onClick={() => onDelete(product.id)}>Удалить</Button>
                <EditButton onClick={() => navigate(`/edit-product/${product.id}`)}>
                    Редактировать
                </EditButton>
            </ButtonsWrapper>
        </CardContainer>
    );
};
