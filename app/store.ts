// Codes by mahdi tasha
// Importing part
import {create} from 'zustand';

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