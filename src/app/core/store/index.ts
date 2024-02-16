import {featureName as authFeatureName, authReducer} from './auth/reducers/auth.reducer';
export const appReducers={
    [authFeatureName]:authReducer
}