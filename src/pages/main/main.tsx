import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, setLocation } from '../../store';
import { useNavigate } from 'react-router-dom';

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

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state: RootState) => state.products);

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filtered.slice(startIndex, startIndex + productsPerPage);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await fetch(
                    'https://api.ipstack.com/check?access_key=03bd356618ad119f488d97755da685f3&format=1'
                );
                const data = await res.json();
                const location = {
                    country_code: data.country_code || 'US',
                    city: data.city || 'Unknown',
                };
                dispatch(setLocation(location));
            } catch {
                dispatch(setLocation({ country_code: 'US', city: 'New York' }));
            }
        };
        fetchLocation();
    }, [dispatch]);

    return (
        <MainWrapper>
            <CreateButton onClick={() => navigate('/create-product')}>
                Создать продукт
            </CreateButton>
            <SearchInput
                type="text"
                placeholder="Поиск продукта..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <Card title="Продукты" products={currentProducts} />
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
