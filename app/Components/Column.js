'use client';

import React from 'react';

export default function Column({ column }) {
  return (
    <div>
      <div className="m-8 border">{column.title}</div>
      <div>Tasks Go Here</div>
    </div>
  );
}
