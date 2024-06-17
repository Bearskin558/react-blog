import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardBody } from '@nextui-org/react';

import { selectCurrent } from '../../features/user/UserSlice';
import User from '../../components/User';

const Following = () => {
  const currentUser = useSelector(selectCurrent);
  if (!currentUser) return null;
  if (currentUser.following.length === 0)
    return <h2>Вы пока ни на кого не подписаны</h2>;

  return (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map((following) => (
        <Link to={`/users/${following.following.id}`} key={following.id}>
          <Card>
            <CardBody className="block">
              <User
                name={following.following.name}
                avatarUrl={following.following.avatarUrl}
              ></User>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Following;
