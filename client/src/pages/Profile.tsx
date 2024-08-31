import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { getUserById } from '../api/user';

import { Header } from '../components/Home/Header';
import { UserInfo } from '../components/Profile/UserInfo';
import { AuthContext } from '../context/authContext';

import { CircularProgress } from '@mui/material';

export const Profile: React.FC = () => {
  const authContext = useContext(AuthContext);
  if(authContext === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  const { user } = authContext;

  if (!user) {
    return (
      <div className="bg-white h-screen w-screen">
        <Header />
        <CircularProgress sx={{ textAlign: 'center', display: 'block', margin: '0 auto' }} />
      </div>
    );
  }

  return (
    <div className="bg-white h-screen w-screen">
      <Header />
      <UserInfo
        id={user.id}
        email={user.email}
        student_id={user.student_id}
        grade={user.grade}
        field_of_interest={user.field_of_interest}
        labo_id={user.labo_id}
        created_at={user.created_at}
      />
    </div>
  );
};
