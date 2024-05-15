import React from 'react';
import { User as NextUiUser } from '@nextui-org/react';

type Props = {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
};

const User: React.FC<Props> = ({ name = '', avatarUrl = '', description = '', className = '' }) => {
  return (
    <NextUiUser
      name={name}
      className={className}
      description={description}
      avatarProps={{ src: `http://localhost:3000${avatarUrl}` }}
    ></NextUiUser>
  );
};

export default User;
