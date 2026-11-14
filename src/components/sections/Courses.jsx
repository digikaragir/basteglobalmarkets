import { COURSES, COURSES_SECTION as S } from '../../data/content';
import { waLink } from '../../config/site';
import { useReveal } from '../../hooks/useReveal';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { CheckIcon, WhatsAppIcon } from '../ui/Icons';
import './Courses.css';

function CourseCard({ course, index }) {
  const [ref, visible] = useReveal();
  const topic = `${course.title} course (${course.level} · ${course.duration})`;
  return (
    <article
      ref={ref}
      className={`course-card reveal ${visible ? 'is-visible' : ''} ${course.popular ? 'course-card--popular' : ''}`}
      style={{ '--delay': `${index * 0.1}s` }}
    >
      {course.popular && <span className="course-card__badge">Most enquired</span>}
      <div className="course-card__head">
        <span className="course-card__level">{course.level}</span>
        <span className="course-card__duration">{course.duration}</span>
      </div>

      <h3 className="course-card__title">{course.title}</h3>
      <p className="course-card__audience">{course.audience}</p>

      <ul className="course-card__list">
        {course.syllabus.map((s, i) => (
          <li key={s} style={{ '--i': i }}>
            <CheckIcon className="course-card__check" />
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <div className="course-card__foot">
        <span className="course-card__price">Price on request</span>
        <Button
          href={waLink({ topic, source: 'Courses' })}
          data-cta={`whatsapp-course-${course.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}
          external
          icon={WhatsAppIcon}
          size="sm"
          variant={course.popular ? 'primary' : 'outline'}
          className="btn--square"
          aria-label={`Enquire about ${course.title} on WhatsApp`}
        >
          Enquire
        </Button>
      </div>
    </article>
  );
}

export default function Courses() {
  return (
    <section id="courses" className="section section--alt" aria-labelledby="courses-title">
      <div className="container">
        <SectionHeader index={S.index} eyebrow={S.eyebrow} description={S.description} titleId="courses-title">
          {S.title}
          <span className="text-green">.</span>
        </SectionHeader>

        {S.nextBatch && (
          <p className="courses__batch">
            <span className="courses__batch-dot" aria-hidden="true" />
            {S.nextBatch}
          </p>
        )}

        <div className="courses-grid">
          {COURSES.map((c, i) => (
            <CourseCard key={c.title} course={c} index={i} />
          ))}
        </div>

        <p className="courses__footnote">
          <a
            href={waLink({ start: true, topic: 'Help me choose the right course', source: 'Courses' })}
            data-cta="whatsapp-start"
            target="_blank"
            rel="noopener noreferrer"
          >
            {S.footnote}
          </a>
        </p>
      </div>
    </section>
  );
}
