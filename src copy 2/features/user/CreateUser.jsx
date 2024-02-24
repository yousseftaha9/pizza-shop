import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [input, setInput] = useState('');
  const username = useSelector((state) => state.user.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();

    navigate('/menu');
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setUsername(input));
    navigate('/menu');
  }

  if (username) {
    return (
      <form onSubmit={handleClick}>
        <Button type="primary">Continue ordering {username}</Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className=" input mb-8 w-72"
      />

      {input !== '' && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
