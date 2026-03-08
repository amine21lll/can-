export function StructuredData() {
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: 'FIFA World Cup 2026',
    description: 'The FIFA World Cup 2026 is a major international football tournament featuring 32 teams.',
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: [
      {
        '@type': 'Place',
        name: 'Canada',
      },
      {
        '@type': 'Place',
        name: 'Mexico',
      },
      {
        '@type': 'Place',
        name: 'United States',
      },
    ],
    organizer: {
      '@type': 'Organization',
      name: 'FIFA',
      url: 'https://www.fifa.com',
    },
    image: '/images/wc2026-og.png',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FIFA World Cup 2026',
    url: 'https://worldcup2026.example.com',
    logo: '/images/wc2026-logo.png',
    sameAs: [
      'https://www.facebook.com/FIFAWorldCup',
      'https://twitter.com/FIFAWorldCup',
      'https://www.instagram.com/fifaworldcup',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
