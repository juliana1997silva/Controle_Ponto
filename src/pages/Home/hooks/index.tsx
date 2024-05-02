import React from 'react';
import { IProps } from '../../../types';
import { HomeContextProvider } from './hooksHome';


const AppProvider: React.FC<IProps> = ({ children }) => <HomeContextProvider>{children}</HomeContextProvider>;

export default AppProvider;
