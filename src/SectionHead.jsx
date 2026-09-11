export default function SectionHead({ index, eyebrow, title, lead, variant }) {
  return (
    <header className={variant ? `section-head section-head_${variant}` : 'section-head'}>
      <div className='section-head__meta'>
        <span className='section-head__index'>{index}</span>
        <span className='section-head__eyebrow'>{eyebrow}</span>
      </div>
      <h2 className='section-head__title'>{title}</h2>
      <p className='section-head__lead'>{lead}</p>
    </header>
  );
}
