import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Mail,
  MapPin,
  Newspaper,
  Sparkles,
} from 'lucide-react';
import { activities, interests, links, publications, type Publication } from './data';

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-header">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function PublicationItem({ publication, index }: { publication: Publication; index: number }) {
  const content = (
    <>
      <span className="publication-index">{String(index + 1).padStart(2, '0')}</span>
      <div className="publication-main">
        <div className="publication-meta">
          <span>{publication.venue}</span>
          <span>{publication.date}</span>
          {publication.note ? <span>{publication.note}</span> : null}
        </div>
        <h3>{publication.title}</h3>
        <p>{publication.authors}</p>
        <div className="tag-row">
          {publication.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      {publication.href ? <ArrowUpRight className="publication-arrow" aria-hidden="true" /> : null}
    </>
  );

  if (publication.href) {
    return (
      <a className="publication-item publication-link" href={publication.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <article className="publication-item">{content}</article>;
}

function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Xiangmou Qu home">
          XQ
        </a>
        <nav aria-label="Primary navigation">
          <a href="#research">Research</a>
          <a href="#publications">Publications</a>
          <a href="#activities">Activities</a>
          <a href="mailto:lokinko.cs@gmail.com">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Machine Learning Algorithm Engineer</p>
          <h1>Xiangmou Qu</h1>
          <p className="hero-lede">
            Building practical intelligent systems for mobile GUI agents, collaborative agent frameworks,
            federated learning, and edge-cloud collaborative computing.
          </p>
          <div className="hero-actions" aria-label="Profile links">
            {links.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">
                {link.label === 'GitHub' ? <Code2 aria-hidden="true" /> : null}
                {link.label === 'Email' ? <Mail aria-hidden="true" /> : null}
                {link.label === 'Zhihu' ? <Newspaper aria-hidden="true" /> : null}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <aside className="profile-panel" aria-label="Profile summary">
          <img src="https://github.com/lokinko.png" alt="Xiangmou Qu GitHub avatar" />
          <div>
            <p className="profile-name">OPPO Research Institute</p>
            <p>Shenzhen, China</p>
          </div>
          <dl>
            <div>
              <dt>Focus</dt>
              <dd>GUI Agents, Federated Learning</dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>Chongqing University, M.S.</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="intro-grid" id="research">
        <article className="about-panel">
          <SectionHeader
            eyebrow="About"
            title="Applied AI research with systems taste."
            description="I work on agentic mobile operation, collaborative intelligence, and efficient learning systems that move from papers into usable infrastructure."
          />
          <p>
            I am a Machine Learning Algorithm Engineer at OPPO Research Institute in Shenzhen. I received my
            master&apos;s degree from the College of Big Data and Software Engineering at Chongqing University.
          </p>
        </article>

        <article className="interest-panel">
          <div className="panel-title">
            <Sparkles aria-hidden="true" />
            <h2>Interests</h2>
          </div>
          <div className="interest-list">
            {interests.map((interest) => (
              <span key={interest}>{interest}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="publication-section" id="publications">
        <SectionHeader
          eyebrow="Selected Publications"
          title="Recent work across agents, federated learning, and distributed systems."
        />
        <div className="publication-list">
          {publications.map((publication, index) => (
            <PublicationItem key={publication.title} publication={publication} index={index} />
          ))}
        </div>
      </section>

      <section className="activity-section" id="activities">
        <SectionHeader eyebrow="Recent Activities" title="Updates" />
        <div className="activity-list">
          {activities.map((activity) => (
            <article className="activity-item" key={activity.title}>
              <time>{activity.date}</time>
              <div>
                <h3>
                  {activity.href ? (
                    <a href={activity.href} target="_blank" rel="noreferrer">
                      {activity.title}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : (
                    activity.title
                  )}
                </h3>
                <p>{activity.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div>
          <BookOpen aria-hidden="true" />
          <span>Last updated: April 26, 2026</span>
        </div>
        <div>
          <MapPin aria-hidden="true" />
          <span>Shenzhen · Chongqing · Research in motion</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
