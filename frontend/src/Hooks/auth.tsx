import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import IUser from 'Types/Entities/IUser';
import ISignIn from 'Types/DTOs/ISignIn';
import ISignUp from 'Types/DTOs/ISignUp';
import IDefaultRequest from 'Types/Standards/IDefaultRequest';
import SignInSchema from 'Schemas/SignInSchema';
import SignUpSchema from 'Schemas/SignUpSchema';
import LocalStorageConfig from 'Config/LocalStorageConfig';
import api from 'Services/api';
import { useToast } from '@chakra-ui/react';
import { useErrors } from './errors';

interface IAuthContext {
  user: IUser | null;
  signUp(data: ISignUp & IDefaultRequest): Promise<void>;
  signIn(data: ISignIn & IDefaultRequest): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const { handleErrors } = useErrors();
  const toast = useToast();

  const [user, setUser] = useState<IUser | null>(null);

  const signUp = useCallback(
    async ({ formRef, ...data }: ISignUp & IDefaultRequest) => {
      try {
        formRef.current?.setErrors({});
        await SignUpSchema.validate(data, {
          abortEarly: false,
        });
        delete data.confirm_password;
        await api.post('/users', data);
        toast({
          title: 'Account created!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        history.push('/');
      } catch (err) {
        handleErrors('Error when trying to sign up', err, formRef);
      }
    },
    [toast, handleErrors, history],
  );

  const signIn = useCallback(
    async ({ formRef, ...data }: ISignIn & IDefaultRequest) => {
      try {
        formRef.current?.setErrors({});
        await SignInSchema.validate(data, {
          abortEarly: false,
        });
        const response = await api.post('/users/sessions', data);
        localStorage.setItem(
          LocalStorageConfig.userKey,
          JSON.stringify(response.data),
        );
        setUser(response.data);
        history.push('/chat');
      } catch (err) {
        handleErrors('Error when trying to sign in', err, formRef);
      }
    },
    [handleErrors, history],
  );

  const signOut = useCallback(async () => {
    try {
      await api.delete('/users/sessions');
    } catch {}
    localStorage.removeItem(LocalStorageConfig.userKey);
    setUser(null);
    history.replace('/home');
  }, [history]);

  useEffect(() => {
    api.get('/users/me').catch(() => {
      signOut();
    });
    const savedUser = localStorage.getItem(LocalStorageConfig.userKey);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthProvider;
