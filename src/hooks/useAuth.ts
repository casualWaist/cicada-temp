import {useContext, useEffect, useState} from 'react';
import { verifyToken, getToken } from '@/utils/jwt';

import {AppContext} from "@/components/AppState";


const useAuth = () => {
    const [appState, setAppState] = useContext(AppContext);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = getToken();

        if (token) {
            const decoded = verifyToken(token);
            setIsAuthenticated(!!decoded);
        }
    }, [appState.walletConnected]);

    return isAuthenticated;
};

export default useAuth;
