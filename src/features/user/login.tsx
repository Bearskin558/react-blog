import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Link } from '@nextui-org/react';

import {
  useLazyCurrentQuery,
  useLoginMutation,
} from '../../app/services/userApi.ts';
import Input from '../../components/Input';
import ErrorMessage from '../../components/ErrorMessage';
import { hasErrorField } from '../../utils/has-error-field';

type Props = {
  setSelected: (value: string) => void;
};

type Login = {
  email: string;
  password: string;
};

const Login: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const onSubmit = async (data: Login) => {
    try {
      setError('');
      await login(data).unwrap();
      await triggerCurrentQuery().unwrap();
      navigate('/');
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Нет аккаунта?{' '}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected('sign-up')}
        >
          Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  );
};

export default Login;
