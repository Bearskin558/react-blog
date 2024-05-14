import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import {
  useCurrentQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from './app/services/userApi.ts';
import { useDeletePostMutation, useGetAllPostsQuery } from './app/services/postsApi.js';
import { hasErrorField } from './utils/has-error-field.js';

const App = () => {
  return (
    <div>
      <Button color="primary" size="lg">
        Button
      </Button>
    </div>
  );
};

export default App;
