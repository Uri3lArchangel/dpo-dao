
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AllPolls from './AllPolls';
import ActivePolls from './ActivePolls';
import EndedPolls from './EndedPolls';





const TabApp= ({polls,admin,wallet}:{polls:any[],admin:string,wallet:any}) => {
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'All Polls',
          children: <AllPolls polls={polls} admin={admin} wallet={wallet} />,
        },
        {
          key: '2',
          label: 'Active Polls',
          children: <ActivePolls polls={polls} admin={admin} wallet={wallet} />,
        },
        {
          key: '3',
          label: 'Ended Polls',
          children: <EndedPolls polls={polls} admin={admin} wallet={wallet}  />,
        },
        
      ];


return(<Tabs defaultActiveKey="1" items={items}  />)};

export default TabApp;