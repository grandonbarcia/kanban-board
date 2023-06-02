import React from 'react';
import { MdOutlineBackupTable } from 'react-icons/md';

export default function ListOfBoards({ title }) {
  return (
    <div className="flex pl-10 pt-2 pb-2">
      <MdOutlineBackupTable className="mr-2" /> {title}
    </div>
  );
}
