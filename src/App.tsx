import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  GraduationCap,
  Mail,
  MapPin,
  Newspaper,
  Sparkles,
} from 'lucide-react';
import {
  siteContent,
  type ContentLink,
  type IconName,
  type Publication,
  type SectionHeaderContent,
} from './data';

const icons: Record<IconName, LucideIcon> = {
  bookOpen: BookOpen,
  code: Code2,
  graduationCap: GraduationCap,
  mail: Mail,
  mapPin: MapPin,
  newspaper: Newspaper,
  sparkles: Sparkles,
};

type ScholarCitationData = {
  citations?: number;
};

function linkAttributes(link: ContentLink) {
  return {
    target: link.external ? '_blank' : undefined,
    rel: link.external ? 'noreferrer' : undefined,
  };
}

function ContentIcon({ name, className }: { name?: IconName; className?: string }) {
  if (!name) {
    return null;
  }

  const Icon = icons[name];

  return <Icon className={className} aria-hidden="true" />;
}

function formatCount(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function metricUrl(dataUrl: string) {
  if (dataUrl.startsWith('http')) {
    return dataUrl;
  }

  if (dataUrl.startsWith('/')) {
    return dataUrl;
  }

  return `${import.meta.env.BASE_URL}${dataUrl}`;
}

function useCitationCount(link: ContentLink) {
  const metric = link.metric;
  const [count, setCount] = useState<number | null>(metric?.fallbackCount ?? null);

  useEffect(() => {
    if (!metric) {
      return undefined;
    }

    const metricConfig = metric;
    const controller = new AbortController();

    async function loadMetric() {
      try {
        const response = await fetch(metricUrl(metricConfig.dataUrl), {
          cache: 'no-store',
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Scholar metric request failed: ${response.status}`);
        }

        const data = (await response.json()) as ScholarCitationData;

        if (typeof data.citations === 'number') {
          setCount(data.citations);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setCount(metricConfig.fallbackCount);
        }
      }
    }

    void loadMetric();

    return () => controller.abort();
  }, [metric]);

  return count;
}

function HeroAction({ link }: { link: ContentLink }) {
  const citationCount = useCitationCount(link);
  const metricText = link.metric && citationCount !== null ? `${formatCount(citationCount)} ${link.metric.label}` : '';

  return (
    <a
      className={link.metric ? 'hero-action-with-metric' : undefined}
      href={link.href}
      aria-label={metricText ? `${link.label}, ${metricText}` : undefined}
      {...linkAttributes(link)}
    >
      <ContentIcon name={link.icon} />
      <span>{link.label}</span>
      {link.metric ? <span className="action-metric">{metricText || link.metric.label}</span> : null}
    </a>
  );
}

function SectionHeader({ eyebrow, title, description }: SectionHeaderContent) {
  return (
    <div className="section-header">
      <span>{eyebrow}</span>
      {title ? <h2>{title}</h2> : null}
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
  const interestTitleId = `${siteContent.research.id}-interests`;

  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href={siteContent.header.brand.href}
          aria-label={siteContent.header.brand.ariaLabel}
        >
          {siteContent.header.brand.label}
        </a>
        <nav aria-label={siteContent.header.navigationAriaLabel}>
          {siteContent.header.navigation.map((link) => (
            <a key={link.label} href={link.href} {...linkAttributes(link)}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id={siteContent.hero.id}>
        <div className="hero-main">
          <div className="hero-copy">
            <p className="eyebrow">{siteContent.hero.eyebrow}</p>
            <h1>{siteContent.hero.title}</h1>
            <p className="hero-lede">{siteContent.hero.lede}</p>
            <div className="hero-actions" aria-label={siteContent.hero.actionsAriaLabel}>
              {siteContent.hero.actions.map((link) => (
                <HeroAction key={link.label} link={link} />
              ))}
            </div>
          </div>

          <aside className="profile-panel" aria-label={siteContent.profile.ariaLabel}>
            <div className="profile-identity">
              <div className="avatar-frame" aria-hidden="true">
                <img src={siteContent.profile.avatar.src} alt={siteContent.profile.avatar.alt} loading="eager" />
                <span>{siteContent.profile.avatar.fallback}</span>
              </div>
              <div className="profile-signature" aria-label={siteContent.profile.signature.ariaLabel}>
                {siteContent.profile.signature.label}
              </div>
            </div>
            <div>
              <p className="profile-name">{siteContent.profile.organization}</p>
              <p>{siteContent.profile.location}</p>
            </div>
            <dl>
              {siteContent.profile.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <article className="intro-panel" id={siteContent.research.id}>
          <div className="intro-copy">
            <SectionHeader {...siteContent.research.header} />
            {siteContent.research.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="interest-cluster" aria-labelledby={interestTitleId}>
            <div className="panel-title">
              <ContentIcon name={siteContent.research.interests.icon} />
              <h2 id={interestTitleId}>{siteContent.research.interests.title}</h2>
            </div>
            <div className="interest-list">
              {siteContent.research.interests.items.map((interest) => (
                <span key={interest}>{interest}</span>
              ))}
            </div>
          </aside>
        </article>
      </section>

      <section className="publication-section" id={siteContent.publications.id}>
        <SectionHeader {...siteContent.publications.header} />
        <div className="publication-list">
          {siteContent.publications.items.map((publication, index) => (
            <PublicationItem key={publication.title} publication={publication} index={index} />
          ))}
        </div>
      </section>

      <section className="activity-section" id={siteContent.activities.id}>
        <SectionHeader {...siteContent.activities.header} />
        <div className="activity-list">
          {siteContent.activities.items.map((activity) => (
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
        {siteContent.footer.map((item) => (
          <div key={item.text}>
            <ContentIcon name={item.icon} />
            <span>{item.text}</span>
          </div>
        ))}
      </footer>
    </main>
  );
}

export default App;
