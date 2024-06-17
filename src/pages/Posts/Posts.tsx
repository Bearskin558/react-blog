import React from 'react';

import { useGetAllPostsQuery } from '../../app/services/postsApi';
import CreatePost from '../../components/CreatePost';
import Card from '../../components/Card';

const Posts = () => {
  const { data } = useGetAllPostsQuery();

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likes,
              likedByUser,
              createdAt,
            }) => (
              <Card
                key={id}
                avatarUrl={author.avatarUrl ?? ''}
                content={content}
                name={author.name ?? ''}
                likesCount={likes.length}
                commentsCount={comments.length}
                authorId={authorId}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
                cardFor="post"
              ></Card>
            ),
          )
        : null}
    </>
  );
};

export default Posts;
