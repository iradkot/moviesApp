import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';
import AppNavigator from 'navigation';
import Loader from "components/loader";

function App() {
    return (
        <Provider store={ store }>
            <PersistGate loading={ <Loader/> } persistor={ persistor }>
                <AppNavigator />
            </PersistGate>
        </Provider>
    );
}

export default App;
