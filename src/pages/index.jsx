import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {Entry} from '@site/src/components/Cards';
import styles from './index.module.css';

export default function Home() {
  const title = translate({id: 'home.title', message: "Welcome to IAFEnvoy's Documentations!"});
  return (
    <Layout title={title} description={translate({id: 'home.description', message: "Documentation for IAFEnvoy's Minecraft mods and libraries."})}>
      <main className="container container--fluid margin-vert--lg">
        <div className={`row ${styles.contentRow}`}>
          <div className="col col--8">
            <header className={styles.heroBanner}>
              <h1>{title}</h1>
              <img className={styles.banner} alt={translate({id: 'home.banner', message: 'IAFEnvoy documentation banner'})} src={useBaseUrl('/img/banner.webp')} />
            </header>
            <p><Translate id="home.intro">This is the documentation site for the mods I create or participate in.</Translate></p>
            <p><Translate id="home.contribute">Everyone is welcome to contribute to this documentation.</Translate>{' '}<Link to="/docs/contribute"><Translate id="home.contributionGuide">Read the contribution guide</Translate></Link></p>
            <h2 className={styles.sectionTitle}><Translate id="home.popular">Popular Mods</Translate></h2>
            <div className={styles.cards}>
              <Entry link="/docs/mod/ice-and-fire-ce" name={translate({id: 'home.iceFire.name', message: 'Ice And Fire: Community Edition'})} content={translate({id: 'home.iceFire.description', message: 'Fork of the popular Ice And Fire mod for Fabric, NeoForge and Forge.'})} />
              <Entry link="/docs/library/jupiter" name="Jupiter" content={translate({id: 'home.jupiter.description', message: 'A powerful, automatically synchronized configuration library.'})} />
              <Entry link="/docs/mod/origins" name="Origins (NeoForge)" content={translate({id: 'home.origins.description', message: 'A complete rewrite of Origins for NeoForge.'})} />
              <Entry link="/docs/mod/dragon-mounts-reforged" name="Dragon Mounts: Reforged" content={translate({id: 'home.dragons.description', message: 'A mod that allows you to tame and ride dragons.'})} />
              <Entry link="/docs/mod/pendulum" name="Pendulum" content={translate({id: 'home.pendulum.description', message: 'Client-side script executor for Minecraft.'})} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
