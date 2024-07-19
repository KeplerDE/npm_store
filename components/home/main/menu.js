import React from 'react';
import styles from './menu.module.scss'; // Adjusted to match file structure
import { BiCategory } from "react-icons/bi";
import Link from 'next/link';

const menuArray = [
  { name: "Women's Fashion", link: "/womens-fashion" },
  { name: "Men's Fashion", link: "/mens-fashion" },
  { name: "Electronics", link: "/electronics" },
  { name: "Jewelry & Watches", link: "/jewelry-watches" },
  { name: "Home, Pet & Appliances", link: "/home-pet-appliances" },
  { name: "Beauty, Health & Hair", link: "/beauty-health-hair" },
  { name: "Shoes, Sneakers, Heels", link: "/shoes-sneakers-heels" },
  { name: "Accessories", link: "/accessories" },
  { name: "Sports & Entertainment", link: "/sports-entertainment" },
  { name: "Kids & Babies", link: "/kids-babies" },
  { name: "Movies & Television", link: "/movies-television" },
  { name: "Gaming, Video Games", link: "/gaming-video-games" },
  { name: "Phones & Telecommunications", link: "/phones-telecommunications" },
  { name: "Toys & Hobbies", link: "/toys-hobbies" },
  { name: "Gifts & Crafts", link: "/gifts-crafts" },
  { name: "Machinery", link: "/machinery" },
  { name: "Security, Safety", link: "/security-safety" }
];

export default function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <div className={styles.menu__header}>
            <BiCategory />
            <b>Categories</b>
          </div>
        </li>
        <div className={styles.menu__list}>
          {menuArray.map((item) => (
            <li key={item.name} className={styles.menu__item}>
              <Link href={item.link} legacyBehavior>
                <a className={styles.menu__link}>
                  <span>{item.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
