import { Link, Outlet } from "umi";
import styles from "./index.less";

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/editTable">EditTable</Link>
        </li>
        <li>
          <Link to="/echart">Echart</Link>
        </li>
        <li>
          <Link to="/reg">Reg</Link>
        </li>
        <li>
          <Link to="/tableSearch">TableSearch</Link>
        </li>
        <li>
          <Link to="/recent">Recent</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
