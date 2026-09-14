'use client';
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gray-50">
      <h1 className="text-7xl font-black text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Không tìm thấy trang</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến địa chỉ khác.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
