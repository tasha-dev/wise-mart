// Codes by mahdi tasha
// Importing part
import {create} from 'zustand';
import {cartItemType} from "@/types";

// Defining type of stores
type themeStoreType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

type userStoreType = {
    uid: string | undefined;
    login: (uid:string) => void;
    logOut: () => void;
}

type cartStoreType = {
    cart: cartItemType[];
    addItem: (item:cartItemType) => void;
    removeItem: (id:number) => void;
    addQuantity: (id:number) => void;
    removeQuantity: (id:number) => void;
}

// Defining stores
export const useTheme = create<themeStoreType>()((set) => ({
    theme: 'dark',
    toggleTheme: () => set((state) => ({
        theme: (state.theme === 'dark') ? 'light' : 'dark'
    }))
}))

export const useUser = create<userStoreType>()((set) => ({
    uid: undefined,
    login: (uid) => {
        localStorage.setItem('uid', uid);
        set({uid: uid});
    },
    logOut: () => {
        localStorage.removeItem('uid');
        set({uid: undefined})
    }
}))

export const useCart = create<cartStoreType>()((set, getState) => ({
    cart: [],
    addItem: (item) => {
        const cart = [...getState().cart];
        cart.push(item);

        set({cart});
    },
    removeItem: (id) => {
        const cart = [...getState().cart];

        set({
            cart: cart.filter((item) => item.item.id !== id)
        });
    },
    addQuantity: (id ) => {
        const cart = [...getState().cart];
        const findedItem = cart.find(item => item.item.id === id);

        if (findedItem) {
            if (findedItem.count + 1 !== 11) {
                findedItem.count = findedItem.count + 1;
                set({cart})
            }
        }
    },
    removeQuantity: (id ) => {
        const cart = [...getState().cart];
        const findedItem = cart.find(item => item.item.id === id);

        if (findedItem) {
            if (findedItem.count - 1 !== 0) {
                findedItem.count = findedItem.count - 1;
                set({cart})
            }
        }
    }
}))