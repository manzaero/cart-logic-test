import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/card/card.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, setLocation } from '../../store/index.ts';

const MainWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Main: React.FC = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await fetch(
                    'https://api.ipstack.com/check?access_key=03bd356618ad119f488d97755da685f3&format=1'
                );
                const data = await res.json();
                console.log('Fetched location:', data);

                const location = {
                    country_code: data.country_code || 'US',
                    city: data.city || 'Unknown',
                };

                dispatch(setLocation(location));
            } catch (err) {
                console.error('Error fetching location:', err);
                dispatch(setLocation({ country_code: 'US', city: 'New York' }));
            }
        };

        fetchLocation();
    }, [dispatch]);

    console.log('Current products state:', products);

    return (
        <MainWrapper>
            <Card title="Available Products" products={products} />
            <div>Product count: {products.length}</div>
        </MainWrapper>
    );
};
