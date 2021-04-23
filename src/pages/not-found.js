import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = '找不到頁面 - Instagram';
  }, []);

  return (
    <div className="app bg-gray-background">
      
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">找不到頁面！</p>
      </div>
    </div>
  );
}