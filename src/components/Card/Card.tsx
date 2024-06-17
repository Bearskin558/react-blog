import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextUiCard,
  Spinner,
} from '@nextui-org/react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FcDislike } from 'react-icons/fc';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import { selectCurrent } from '../../features/user/UserSlice';

import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '../../app/services/postsApi';
import User from '../User';
import { useDeleteCommentMutation } from '../../app/services/commentsApi';
import { formatToClientDate } from '../../utils/format-to-client-date';
import Typography from '../Typography';
import MetaInfo from '../MetaInfo';
import ErrorMessage from '../ErrorMessage';
import { hasErrorField } from '../../utils/has-error-field';
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../app/services/likesApi';

type Props = {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  cardFor: 'comment' | 'post' | 'current-post';
  likedByUser?: boolean;
};

const Card: React.FC<Props> = ({
  avatarUrl = '',
  name = '',
  authorId = '',
  content = '',
  commentId = '',
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = '',
  cardFor = 'post',
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation();
  const [unLikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrent);

  const refetchPosts = async () => {
    switch (cardFor) {
      case 'post':
        await triggerGetAllPosts().unwrap();
        break;
      case 'current-post':
      case 'comment':
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error('Неверный аргумент cardFor');
    }
  };

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case 'post':
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case 'current-post':
          await deletePost(id).unwrap();
          await refetchPosts();
          navigate('/');
          break;
        case 'comment':
          await deleteComment(commentId).unwrap();
          await refetchPosts();
          break;
        default:
          throw new Error('Неверный аргумент cardFor');
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      } else {
        setError(error as string);
      }
    }
  };
  const handleClickLike = async () => {
    try {
      likedByUser
        ? await unLikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap();
      await refetchPosts();
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      } else {
        setError(error as string);
      }
    }
  };

  return (
    <NextUiCard className="mb-5 p-2">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-none text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== 'comment' && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleClickLike}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUiCard>
  );
};

export default Card;
