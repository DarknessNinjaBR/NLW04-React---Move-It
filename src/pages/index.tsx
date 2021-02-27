import { Session } from 'inspector';
import Head from 'next/head';
import { GetServerSideProps } from 'next'
import { ChallangeBox } from '../components/ChallangeBox';
import { CompletedChallanges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css'
import { ChallangesProvider } from '../contexts/ChallangesContext';

interface HomeProps {
  level: number,
  currentExperience: number,
  completedChallanges: number
}

export default function Home(props) {
  return (
    <ChallangesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      completedChallanges={props.completedChallanges}
      >

      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar/>

        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallanges/>
              <Countdown/>
            </div>
            <div>
              <ChallangeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallangesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {level, currentExperience, completedChallanges} = ctx.req.cookies

  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      completedChallanges: Number(completedChallanges)
    }
  }
}

