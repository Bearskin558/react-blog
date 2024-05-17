import React from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div
      className="text-default-500 flex items-center gap-2 mb-10 cursor-pointer w-[100px]"
      onClick={() => navigate(-1)}
    >
      <FaRegArrowAltCircleLeft /> Назад
    </div>
  );
};

export default GoBack;
