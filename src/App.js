import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';
import AppNavigator from 'navigation';
import Loader from "components/loader";

function App() {
    return (
        <Provider store={ store }>
            <PersistGate loading={ <Loader/> } persistor={ persistor }>
                <ThemeProvider theme={theme} >
                <AppNavigator />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
