import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const isMountedRef = React.createRef();

export const navigationRef = React.createRef();

export function push(...args) {
    navigationRef.current?.dispatch(StackActions.push(...args));
}

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}
