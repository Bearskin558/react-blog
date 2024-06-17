import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, Link } from '@nextui-org/react';

import Input from '../../components/Input';
import { hasErrorField } from '../../utils/has-error-field';
import ErrorMessage from '../../components/ErrorMessage/index';
import {
  useLazyCurrentQuery,
  useRegistrationMutation,
} from '../../app/services/userApi.ts';

type Register = {
  email: string;
  password: string;
  name: string;
};

type Props = {
  setSelected: (value: string) => void;
};

const Register = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegistrationMutation();
  const [error, setError] = useState('');
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const onSubmit = async (data: Register) => {
    try {
      setError('');
      await register(data).unwrap();
      setSelected('login');
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
        name="name"
        label="Имя"
        type="text"
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
        Уже есть аккаунт?{' '}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected('login')}
        >
          Войти
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
};

export default Register;
