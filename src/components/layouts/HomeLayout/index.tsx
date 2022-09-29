import { clsx } from 'clsx'
import type { FC, PropsWithChildren } from 'react'
import styles from './index.module.css'

const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={clsx(styles.bg, 'h-screen flex justify-center items-center')}
    >
      <div className="text-white gap-7 max-w-[45rem] flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default HomeLayout
