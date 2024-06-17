import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { MdAlternateEmail } from 'react-icons/md';

import { selectCurrent } from '../../features/user/UserSlice';

const Profile = () => {
  const current = useSelector(selectCurrent);

  if (!current) {
    return null;
  }
  const { name, email, avatarUrl, id } = current;

  return (
    <Card className="py-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col itemx-center">
        <Image
          alt="Card profile"
          className="object-cover rounded-xl"
          src={`http://localhost:3000${avatarUrl}`}
          width={150}
        />
      </CardHeader>
      <CardBody>
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large mb-2">{name}</h4>
          <p className="text-default-500 flex items-center gap-2">
            <MdAlternateEmail /> {email}
          </p>
        </Link>
      </CardBody>
    </Card>
  );
};

export default Profile;
