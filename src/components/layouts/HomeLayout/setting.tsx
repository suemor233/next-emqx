import { Variants, m } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { memo, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { message } from 'react-message-popup'

import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Modal,
  Text,
} from '@nextui-org/react'

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
  const router = useRouter()
  const { deviceStore } = useStore()
  const closeHandler = () => {
    if (visible) {
      setVisible(false)
      deviceStore.startLinkage()
    }
  }

  const handleChange = (e) => {
    if (e === 'linkage') {
      setVisible(true)
    } else if (e === 'logout') {
      localStorage.removeItem('smarthome-token')
      router.push('/login')
      message.success('成功退出登录')
    }
  }
  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        preventClose={true}
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

      <div className="absolute right-5 top-5 cursor-pointer flex justify-center items-center">
        <Dropdown placement="bottom-left">
          <Dropdown.Trigger>
            <m.div
              whileHover="whileHover"
              whileTap="whileTap"
              variants={buttonAnimation}
            >
              <IoSettingsOutline size={30} />
            </m.div>
          </Dropdown.Trigger>
          <Dropdown.Menu
            color="secondary"
            aria-label="Avatar Actions"
            onAction={(key) => handleChange(key)}
          >
            <Dropdown.Item key="profile" css={{ height: '$18' }}>
              <Text b color="inherit" css={{ d: 'flex' }}>
                当前账号
              </Text>
              <Text b color="inherit" css={{ d: 'flex' }}>
                admin
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="linkage" withDivider color="primary">
              联动模式
            </Dropdown.Item>
            <Dropdown.Item key="logout" color="error" withDivider>
              退出登录
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
})

const LinkageBodyArray = ['温度', '湿度', '光照', '燃气', '人体红外']

const LinkageBody = observer(() => {
  const { deviceStore } = useStore()
  const currentLinkValue = () => {
    const current =
      deviceStore.linkage.sensor === '燃气'
        ? ['安全', '危险']
        : ['无人', '有人']
    console.log(current)
    return current
  }

  return (
    <div className="flex gap-2">
      <Checkbox.Group
        value={deviceStore.linkage.launch ? ['open'] : []}
        className="flex items-center justify-center"
      >
        <Checkbox
          value="open"
          size="lg"
          onChange={(e: boolean) => (deviceStore.linkage.launch = e)}
        />
      </Checkbox.Group>

      <Dropdown>
        <Dropdown.Button flat css={{ tt: 'capitalize' }}>
          {deviceStore.linkage.sensor}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={deviceStore.linkage.sensor}
          onSelectionChange={(key: any) => {
            deviceStore.linkage.sensor = key.anchorKey
          }}
        >
          {LinkageBodyArray.map((item) => (
            <Dropdown.Item key={item}>{item}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {deviceStore.linkage.sensor === '燃气' ||
      deviceStore.linkage.sensor === '人体红外' ? (
        <Dropdown>
          <Dropdown.Button flat css={{ tt: 'capitalize' }} >
            {deviceStore.linkage.sensor === '燃气'
              ? deviceStore.linkage.value.gasValue
              : deviceStore.linkage.value.humanValue}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Single selection actions"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={
              deviceStore.linkage.sensor === '燃气'
                ? deviceStore.linkage.value.gasValue
                : deviceStore.linkage.value.humanValue
            }
            onSelectionChange={(key: any) =>
              deviceStore.linkage.sensor === '燃气'
                ? (deviceStore.linkage.value.gasValue = key.anchorKey)
                : (deviceStore.linkage.value.humanValue = key.anchorKey)
            }
          >
            {currentLinkValue().map((item) => (
              <Dropdown.Item key={item}>{item}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <>
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
            value={deviceStore.linkage.value.inputValue}
            onChange={(e) =>
              (deviceStore.linkage.value.inputValue = e.target.value)
            }
          />
        </>
      )}

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
