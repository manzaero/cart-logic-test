import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

interface Location {
    country_code: string;
    city: string;
}

interface State {
    products: Product[];
    cart: Product[];
    location: Location | null;
}

const initialState: State = {
    products: [],
    cart: [],
    location: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<Location>) => {
            console.log('Setting location in reducer:', action.payload);
            state.location = action.payload;
            if (action.payload.country_code === 'ES' && action.payload.city === 'Madrid') {
                state.products = [
                    { id: 1, name: 'Jamón Ibérico', price: 25 },
                    { id: 2, name: 'Paella Kit', price: 15 },
                    { id: 3, name: 'Spanish Olive Oil', price: 10 },
                ];
            } else {
                state.products = [
                    { id: 1, name: 'Generic Product 1', price: 10 },
                    { id: 2, name: 'Generic Product 2', price: 20 },
                ];
            }
            console.log('Updated products:', state.products);
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        }
    },
});

export const { setLocation, addToCart, removeFromCart, addProduct } = productsSlice.actions;
export default productsSlice.reducer;

export const store = configureStore({
    reducer: productsSlice.reducer,
});

export type RootState = ReturnType<typeof productsSlice.reducer>;
export type AppDispatch = typeof store.dispatch;