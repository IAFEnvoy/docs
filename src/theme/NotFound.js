import React from 'react';
import { Solar } from '../components/solar/solar';

export default function NotFoundWrapper(_) {
  return (
    <>
      <h2 style={{ textAlign: 'center', position: 'relative', top: '20px' }}>This page is missing in the solar system.</h2>
      <Solar></Solar>
    </>
  );
}
