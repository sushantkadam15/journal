import React, { createContext, useState, useContext } from 'react';


export const MenuContext = createContext();


export const MenuProvider = ({ children, initialState = false }) => {
    const [open, setOpen] = useState(initialState);

    const showDrawer = () => {
        setOpen(true);
    };

    const hideDrawer = () => {
        setOpen(false);
    };

    return (
        <MenuContext.Provider value={{ open, showDrawer, hideDrawer }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);

    if (context === undefined) {
        throw new Error('useMenu must be used within a MenuProvider');
    }

    return context;
};
