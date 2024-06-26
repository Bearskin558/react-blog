import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import { Button, Textarea } from '@nextui-org/react';
import { IoMdCreate } from 'react-icons/io';

import { useCreateCommentMutation } from '../../app/services/commentsApi';
import ErrorMessage from '../ErrorMessage';
import { useLazyGetPostByIdQuery } from '../../app/services/postsApi';

const CreateComment = () => {
  const [createComment] = useCreateCommentMutation();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { id } = useParams<{ id: string }>();

  const error = errors?.post?.message as string;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap();
        setValue('comment', '');
        setTimeout(() => triggerGetPostById(id).unwrap(), 100);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="comment"
        control={control}
        defaultValue={''}
        rules={{
          required: 'Обязательное поле',
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Комментарий..."
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="primary"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Оставить комментарий
      </Button>
    </form>
  );
};

export default CreateComment;
