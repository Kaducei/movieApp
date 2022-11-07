import { createContext } from 'react';

const { Provider: MyContextProvider, Consumer: MyContextConsumer } = createContext();

export { MyContextProvider, MyContextConsumer };
