import React, { createContext, useContext, useState } from 'react';

// Create the CaptainDataContext

export const CaptainDataContext = createContext();

// Custom hook to use the CaptainContext
// export const useCaptain = () => useContext(CaptainDataContext);

// Provider component
const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const logoutCaptain = () => {
        setCaptain(null);
    };

    return (
        <CaptainDataContext.Provider value={[captain, updateCaptain, logoutCaptain]}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;