import React from 'react';

export default function AddSectionItem({ itemName, onClick }) {
  return (
    <div>
      <ul className="ml-3">
        <div>
          <button
            onClick={onClick}
            className="cursor-pointer w-full pl-3 flex justify-start items-center rounded-md hover:bg-primary/85 active:bg-primary/85 h-[33px] text-xs font-medium text-neutral-100 uppercase"
          >
            {itemName}
          </button>
        </div>
      </ul>
    </div>
  );
}
