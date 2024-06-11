type ErrorMessagesProps = {
  errors: string[];
  className: string;
};

export function ErrorMessages({ errors, className }: ErrorMessagesProps) {
  if (!errors) return;

  return (
    <>
      {
        errors.map((error: string, index: number) => {
          return <p className={className} key={index}>{error}</p>;
        })
      }
    </>
  );
}
