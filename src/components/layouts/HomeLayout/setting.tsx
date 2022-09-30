import { Variants, m } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { memo, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'

import { Button, Checkbox, Dropdown, Input, Modal, Text } from '@nextui-org/react'

import { DEVICE } from '~/store/device/type'

import { useStore } from '../../../store/index'

const buttonAnimation: Variants = {
  whileHover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 17,
    },
  },
  whileTap: {
    scale: 0.8,
  },
}

export const Setting = memo(() => {
  const [visible, setVisible] = useState(false)
  const handler = () => setVisible(true)
  const { deviceStore } = useStore()
  const closeHandler = () => {
    if (visible) {
      setVisible(false)
      deviceStore.startLinkage()
    }
 
  }
  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width={'450px'}
      >
        <Modal.Header>
          <Text h3>联动设置</Text>
        </Modal.Header>
        <Modal.Body>
          <LinkageBody />
        </Modal.Body>

        <Modal.Footer>
     
          <Button auto onClick={closeHandler}>
            确定
          </Button>
        </Modal.Footer>
      </Modal>

      <m.div
        whileHover="whileHover"
        whileTap="whileTap"
        variants={buttonAnimation}
        className="absolute right-5 top-5 cursor-pointer"
        onClick={() => handler()}
      >
        <IoSettingsOutline size={30} />
      </m.div>
    </div>
  )
})

const LinkageBodyArray = ['温度', '湿度', '光照', '燃气', '人体红外']

const LinkageBody = observer(() => {
  const { deviceStore } = useStore()

  return (
    <div className="flex gap-2">
         <Checkbox value="open" size='lg' onChange={(e)=>console.log(e)}/>
      <Dropdown>
        <Dropdown.Button flat css={{ tt: 'capitalize' }}>
          {deviceStore.linkage.sensor}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={deviceStore.linkage.sensor}
          onSelectionChange={(key: any) =>
            (deviceStore.linkage.sensor = key.anchorKey)
          }
        >
          {LinkageBodyArray.map((item) => (
            <Dropdown.Item key={item}>{item}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Button flat css={{ tt: 'capitalize' }}>
          {deviceStore.linkage.condition}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={deviceStore.linkage.condition}
          onSelectionChange={(key: any) =>
            (deviceStore.linkage.condition = key.anchorKey)
          }
        >
          <Dropdown.Item key={'>'}>大于</Dropdown.Item>
          <Dropdown.Item key={'<'}>小于</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Input
        width="52px"
        placeholder="多少"
        value={deviceStore.linkage.value}
        onChange={(e) => (deviceStore.linkage.value = e.target.value)}
      />

      <Dropdown>
        <Dropdown.Button flat css={{ tt: 'capitalize' }}>
          {deviceStore.linkage.state}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={deviceStore.linkage.state}
          onSelectionChange={(key: any) =>
            (deviceStore.linkage.state = key.anchorKey)
          }
        >
          <Dropdown.Item key={'开'}>开</Dropdown.Item>
          <Dropdown.Item key={'关'}>关</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Button flat css={{ tt: 'capitalize' }}>
          {deviceStore.linkage.device}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={deviceStore.linkage.device}
          onSelectionChange={(key: any) =>
            (deviceStore.linkage.device = key.anchorKey)
          }
        >
          {Object.keys(DEVICE).map((key) => (
            <Dropdown.Item key={DEVICE[key]}>{DEVICE[key]}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
})
