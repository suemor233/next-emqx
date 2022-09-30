import { clsx } from 'clsx'
import type { Variants } from 'framer-motion'
import { m } from 'framer-motion'
import type { FC, PropsWithChildren } from 'react'

import styles from './index.module.css'
import {Setting } from './setting'

export const backdropMotion: Variants = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={clsx(
        styles.bg,
        'h-screen flex justify-center items-center flex-col text-white relative',
      )}
    >
      <Setting />
      <h1 className="font-ui text-5xl flex-1 flex items-center select-none">
        欢迎来到智能家居控制中心
      </h1>
      <m.div
        className="gap-7 max-w-[45rem] flex flex-col m-5 flex-[4]"
        variants={backdropMotion}
        initial="exit"
        animate="enter"
        exit="exit"
      >
        {children}
      </m.div>
    </div>
  )
}

export default HomeLayout
