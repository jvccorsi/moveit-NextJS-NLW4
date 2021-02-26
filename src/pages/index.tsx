import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenge } from '../components/CompletedChallenge';
import { CountDown } from '../components/CountDown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountDownContextProvider } from '../context/CountDownContext';

import styles from '../styles/components/pages/Home.module.css';
import { ChallengeProvider } from '../context/ChallengeContext';

interface HomeProps{
  level:number;
  currentExperience:number;
  challengeCompleted:number;
}


export default function Home(props:HomeProps) {
  console.log(props);
  return (
    <ChallengeProvider level={props.level} currentExperience={props.currentExperience} challengeCompleted={props.challengeCompleted}>
      <div className={styles.container}>
        <Head>
          <title>Inicio | Moveit</title>
        </Head>
        <ExperienceBar />
        <CountDownContextProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenge />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownContextProvider>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = {
    level: 1,
    currentExperience: 50,
    challengeCompleted: 2,
  }
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted)
    }

  }
};