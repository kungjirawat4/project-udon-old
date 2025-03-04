import { Tab, Tabs } from '@nextui-org/react';
import { FaBasketShopping, FaClipboardList, FaClipboardQuestion } from 'react-icons/fa6';

import Z1 from './components/_components/form/z1';
import Queue1 from './components/queue1';
import Queue2 from './components/queue2';

export default function Queueapp() {
  return (

    <div className="flex w-full flex-col items-center">
      <Tabs aria-label="Options">
        <Tab
          key="รอเรียกคิว"
          title={(
            <div className="flex items-center space-x-2">
              <FaClipboardQuestion />

              <span>รอเรียกคิว</span>
            </div>
          )}
          className="xs:w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full"
        >
          {/* <div>
          <h2>รอเรียกคิว</h2>
        </div> */}
          <Queue1 />
        </Tab>
        <Tab
          key="รายการคิว"
          title={(
            <div className="flex items-center space-x-2">
              <FaClipboardList />
              <span>รายการคิว</span>
            </div>
          )}
          className="xs:w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full"
        >
          {/* <div>
          <h2>เรียกคิวแล้ว</h2>
        </div> */}
          <Queue2 />
        </Tab>
        <Tab
          key="พักตะกร้า"
          title={(
            <div className="flex items-center space-x-2">
              <FaBasketShopping />
              <span>พักตะกร้า</span>
            </div>
          )}
          className="xs:w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full"
        >
          <div>
            <h2>พักตะกร้า</h2>
            <Z1 z1="" />
          </div>

        </Tab>
      </Tabs>

    </div>

  );
}
