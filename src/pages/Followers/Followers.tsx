import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardBody } from '@nextui-org/react';

import { selectCurrent } from '../../features/user/UserSlice';
import User from '../../components/User';

const Followers = () => {
  const currentUser = useSelector(selectCurrent);
  if (!currentUser) return null;
  if (currentUser.followers.length === 0)
    return <h2>У вас пока нет подсписчиков</h2>;

  return (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map((follower) => (
        <Link to={`/users/${follower.follower.id}`} key={follower.id}>
          <Card>
            <CardBody className="block">
              <User
                name={follower.follower.name}
                avatarUrl={follower.follower.avatarUrl}
              ></User>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Followers;
