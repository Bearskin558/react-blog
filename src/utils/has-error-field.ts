export const hasErrorField = (err: unknown): err is { data: { error: string } } => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'data' in err &&
    err.data !== null &&
    typeof err.data === 'object' &&
    'error' in err.data
  );
};
