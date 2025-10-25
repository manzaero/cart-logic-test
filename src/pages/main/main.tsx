import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, SearchInput } from '../../components/';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useProductsLoader } from '../../hooks/useProductsLoader';

const MainWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const CreateButton = styled.button<{ $active?: boolean }>`
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid ${({ $active }) => ($active ? '#333' : '#ccc')};
    background-color: ${({ $active }) => ($active ? '#ddd' : '#f9f9f9')};
    cursor: pointer;
    margin: 4px 0 16px;
`;

const PaginationWrapper = styled.div`
    margin-top: 16px;
    display: flex;
    gap: 8px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
    padding: 6px 10px;
    border-radius: 4px;
    border: ${({ $active }) => ($active ? '2px solid #000' : '1px solid #ccc')};
    background: ${({ $active }) => ($active ? '#eee' : '#fff')};
    cursor: pointer;
`;

export const Main: React.FC = () => {
    const navigate = useNavigate();
    const products = useSelector((state: RootState) => state.products.products) || [];

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;

    useProductsLoader();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filtered.slice(startIndex, startIndex + productsPerPage);

    return (
        <MainWrapper>
            <CreateButton onClick={() => navigate('/create-product')}>
                Создать продукт
            </CreateButton>
            <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск продукта..."
            />
            <Card name="Продукты" products={currentProducts} />
            <div>Всего продуктов: {filtered.length}</div>
            <PaginationWrapper>
                {Array.from({ length: totalPages }, (_, i) => (
                    <PageButton
                        key={i}
                        $active={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </PageButton>
                ))}
            </PaginationWrapper>
        </MainWrapper>
    );
};
