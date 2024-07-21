import { useSession } from "next-auth/react";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import Link from 'next/link';
import styles from "../../../styles/Home.module.scss";

export default function User() {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <div className={styles.user_container}>
        {session ? (
          <div className={styles.user_infos}>
            <img className={styles.user_avatar} src={session.user?.image || "https://i.pravatar.cc/150"} alt="User Avatar" />
            <h4 className={styles.user_name}>{session.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user_infos}>
            <img className={styles.user_avatar} src="https://i.pravatar.cc/150" alt="Default Avatar" />
            <div className={styles.user_infos_btns}>
              <button className={styles.button}>Register</button>
              <button className={styles.button_alt}>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user_nav}>
          <li>
            <Link href="/profile">
              <span className={styles.icon}><IoSettingsOutline /></span>
            </Link>
          </li>
          <li>
            <Link href="/clipboard">
              <span className={styles.icon}><HiOutlineClipboardList /></span>
            </Link>
          </li>
          <li>
            <Link href="/messages">
              <span className={styles.icon}><AiOutlineMessage /></span>
            </Link>
          </li>
          <li>
            <Link href="/favorites">
              <span className={styles.icon}><BsHeart /></span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
