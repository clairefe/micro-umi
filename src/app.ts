/*
 * @Date: 2020-10-20 20:08:41
 * @LastEditors: hu.wenjun
 * @LastEditTime: 2020-10-22 20:23:50
 */
import { useState } from 'react';

export function useQiankunStateForSlave() {
  const [masterState, setMasterState] = useState({
    age: 1
  });

  return {
    masterState,
    setMasterState,
  }
}
