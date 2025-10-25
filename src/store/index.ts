import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

interface State {
    products: Product[];
    cart: Product[];
}

const initialState: State = {
    products: [],
    cart: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(p => p.id !== action.payload);
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        editProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
                localStorage.setItem('products', JSON.stringify(state.products));
            }
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
    },
});

export const {
    setProducts,
    addProduct,
    removeProduct,
    editProduct,
    addToCart,
    removeFromCart,
} = productsSlice.actions;

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
