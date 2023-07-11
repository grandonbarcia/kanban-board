import React from 'react';
import { MdOutlineBackupTable } from 'react-icons/md';

const ACTIVE =
  'flex w-11/12 pl-10 pt-2 pb-2 bg-purple-500 text-white rounded-r-3xl';
const INACTIVE = 'flex pl-10 pt-2 pb-2';

export default function ListOfBoards({ title, activeBoard }) {
  return (
    <div className={title === activeBoard ? ACTIVE : INACTIVE}>
      <MdOutlineBackupTable className="mr-2" /> {title}
    </div>
  );
}
