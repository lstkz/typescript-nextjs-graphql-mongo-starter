import Link from 'next/link';
import React from 'react';
import 'twin.macro';

export default function Home() {
  return (
    <div tw="p-10">
      <Link href="/todos">Example todos</Link>
      <br />
      <Link href="/register">register</Link>
    </div>
  );
}
