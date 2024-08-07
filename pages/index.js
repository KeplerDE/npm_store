import Image from 'next/image';
import axios from 'axios';
import styles from '../styles/Home.module.scss';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import Main from '@/components/home/main'; 

export default function Home({ country }) {
  const { data: session } = useSession();
  return (
    <div>
      <Header country={country} />
      <main className={styles.home}>
        <div className={styles.container}>
          <Main /> 
        </div>

      </main>
      {session ? "You are logged in" : "You are not logged in"}
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps() {
  let countryData = {};

  try {
    const response = await axios.get("https://api.ipregistry.co/?key=8488fpunkf5bowe6");
    const data = response.data.location.country;

    countryData = {
      name: data.name || 'Unknown', 
      flag: data.flag?.emoji_two || '🏳️', 
    };
  } catch (error) {
    console.log(error);
    countryData = {
      name: 'Unknown',
      flag: '🏳️',
    };
  }

  return {
    props: {
      country: countryData,
    },
  };
}
