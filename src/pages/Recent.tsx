import React, { useState } from "react";
import styles from "./Recent.module.less";
const Recent = () => {
  const [defaultMenu, setDefaultMenu] = useState("");
  const [historyMenu, setHistoryMenu] = useState([]);
  const menuList = [
    { key: 1, name: "首页", value: "/abc" },
    { key: 2, name: "页面2", value: "/abc2" },
    { key: 3, name: "页面3", value: "/abc3" },
    { key: 4, name: "页面4", value: "/abc4" },
  ];
  const change = (item) => {
    if (defaultMenu === item.value) return;
    setDefaultMenu(item.value);
    console.log(historyMenu);
    if (
      !historyMenu.some(
        (menu) => menu.key === item.key && menu.value === item?.value
      )
    ) {
      console.log(1);
      setHistoryMenu([item, ...historyMenu]);
    }
  };
  const del = (item) => {
    const arr = historyMenu.filter((menu) => {
      return menu.key !== item.key && menu.value !== item.value;
    });
    if (item.value === defaultMenu) {
      setDefaultMenu(arr?.[0]?.value);
    }
    setHistoryMenu(arr);
  };
  return (
    <div className={styles.recent}>
      <div className={styles.leftMenu}>
        {menuList?.map((item) => {
          return (
            <div
              key={item?.key}
              className={`${styles.common} ${defaultMenu === item?.value ? styles.active : ""}`}
              onClick={() => change(item)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className={styles.rightRecent}>
        {historyMenu?.map((item) => {
          return (
            <div
              key={item.value}
              className={`${styles.historyCommon} ${defaultMenu === item?.value ? styles.historyActive : ""}`}
            >
              {item.name}
              <span onClick={()=>del(item)}>×</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recent;
