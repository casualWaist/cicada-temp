import {useContext} from 'react';
import {AppContext} from '@/components/AppState';

export const useNotification = () => {
    const [appState, setAppState] = useContext(AppContext);

    return (type: 'alert' | 'info' | 'success' | 'fail', msg: string) => {
        setAppState({
            notify: true,
            noteText: msg,
            noteStyle: type
        });
    };
};
