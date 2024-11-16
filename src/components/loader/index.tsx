import { LoaderCircleIcon } from 'lucide-react';
import React from 'react';

export default function Loader() {
  return (
    <span className="m-auto animate-spin">
      <LoaderCircleIcon />
    </span>
  );
}
