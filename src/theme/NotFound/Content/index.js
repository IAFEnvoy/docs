import React from 'react';
import clsx from 'clsx';
export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div class="error-container">
        <img src="/img/404.webp" alt="404.webp" class="error-img">
        </img>
        <h1 class="error-title">Website seems running into a problem.</h1>
        <p class="error-text">404 Not Found</p>
        <a href="/" class="back-btn">Back to Home</a>
      </div>
    </main>
  );
}
