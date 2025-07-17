function LoginMessage() {
  return (
    <div className='grid bg-primary-800  w-[40rem] h-[30rem]'>
      <p className='text-center text-xl py-12 self-center'>
        Please{' '}
        <a href='/login' className='underline text-accent-500'>
          login
        </a>{' '}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
