// DefaultLayout.js

import React from 'react'
import MyNavbarBS5 from './my-navbar'
import MyFooter from './my-footer'
import Head from 'next/head'
import NextBreadCrumb from '@/components/common/next-breadcrumb'
import { useLoader } from '@/hooks/use-loader'
import NavberMotion from './my-navbar/navber-motion'

export default function DefaultLayout({ title = 'Next-BS5', children }) {
  const { loader } = useLoader()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <MyNavbarBS5 />

      <main className="flex-shrink-0 mt-3">
     
        <div
          className="mt-5"
          style={{
            position: 'absolute',
            margin: '0px',
            border: '0px',
            width: '100%',
            height: '80vh',
            background: '#ccc',
          }}
        >
          <NextBreadCrumb isHomeIcon isChevron bgClass="" />
          <NavberMotion />
        </div>
        <div className="content-wrapper container">{children}</div>

        {/* 全域的載入動畫指示器 */}
        {loader()}
      </main>

      <MyFooter />
    </>
  )
}
