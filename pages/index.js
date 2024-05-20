import Image from 'next/image';
import axios from 'axios';
import styles from '../styles/Home.module.scss';
import Header from '../components/Header';
import Footer from '@/components/Footer';

export default function Home({ country }) {
  return (
    <div>
      <Header country={country}/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
      <Footer country={country}/>
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