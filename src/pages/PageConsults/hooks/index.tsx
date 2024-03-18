import React from 'react';
import { IProps } from '../../../types';
import { ConsultsContextProvider } from './hooksConsults';

const AppProvider: React.FC<IProps> = ({ children }) => <ConsultsContextProvider>{children}</ConsultsContextProvider>;

export default AppProvider;
