/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Image } from 'react-bootstrap';

const avatars = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
  '/avatars/avatar5.png',
];

const AvatarUploader = ({ refreshUser }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/auth/current_user')
      .then((res) => {
        setUser(res.data);
        setSelectedAvatar(res.data.avatar || avatars[0]);
      })
      .catch((err) => {
        console.error('err fetching user', err);
      });
  }, []);

  const selectAvatar = async (avatar) => {
    try {
      await axios.put(`/avatar/select-avatar/${user.googleId}`, { avatar });
      setSelectedAvatar(avatar);
      refreshUser();
    } catch (err) {
      console.error('err updating avatar', err);
    }
  };

  const deleteAvatar = async () => {
    if (!user) return;

    try {
      await axios.delete(`/avatar/delete-avatar/${user.googleId}`);
      setSelectedAvatar('/avatars/default.png');
      refreshUser();
    } catch (err) {
      console.error('err deleting avatar', err);
    }
  };

  return (
    <div className='avatar-uploader'>
      <div className='avatar-title-container'></div>
      <div className='avatar-grid'>
        {avatars.map((avatar) => (
          <Image
            key={avatar}
            src={avatar}
            width={60}
            height={60}
            roundedCircle
            className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
            onClick={() => selectAvatar(avatar)}
          />
        ))}
      </div>

      <Button
        variant='danger'
        className='mt-3 avatar-reset-btn'
        onClick={deleteAvatar}
      >
        Reset Avatar
      </Button>
    </div>
  );
};

export default AvatarUploader;
