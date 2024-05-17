import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import { Link } from 'react-router-dom';
import User from '../../components/user';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/userSlice';

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
