import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button, Card, Image, useDisclosure } from '@nextui-org/react';
import { CiEdit } from 'react-icons/ci';
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from 'react-icons/md';

import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../../app/services/followApi';
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from '../../app/services/userApi.ts';
import { useAppDispatch } from '../../app/hooks';
import { resetUser, selectCurrent } from '../../features/user/UserSlice';
import ProfileInfo from '../../components/ProfileInfo/';
import { formatToClientDate } from '../../utils/format-to-client-date';
import CountInfo from '../../components/CountInfo/';
import GoBack from '../../components/GoBack/';
import EditProfile from '../../components/EditProfile/';

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useSelector(selectCurrent);
  const { data } = useGetUserByIdQuery(id ?? '');
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [triggerGetUserById] = useLazyGetUserByIdQuery();
  const [triggerCurrentUserQuery] = useLazyCurrentQuery();

  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(resetUser());
    },
    [],
  );

  if (!data) return null;

  const handleFollow = async () => {
    try {
      if (id) {
        if (data.isFollowing) {
          await unfollowUser({ followingId: id }).unwrap();
        } else {
          await followUser({ followingId: id }).unwrap();
        }
        await triggerGetUserById(id);
        await triggerCurrentUserQuery();
      }
    } catch (error) {}
  };

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserById(id).unwrap();
        await triggerCurrentUserQuery().unwrap();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <GoBack />
      <div className="flex items-center gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`http://localhost:3000${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? 'default' : 'primary'}
                variant="flat"
                className="gap-2"
                onClick={handleFollow}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? 'Отписаться' : 'Подписаться'}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onClick={() => onOpen()}>
                Редактировать
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта" info={data.email} />
          <ProfileInfo title="Местоположение" info={data.location} />
          <ProfileInfo
            title="Дата рождения"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне" info={data.bio} />
          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  );
};

export default UserProfile;
