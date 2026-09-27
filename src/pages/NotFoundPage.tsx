import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { Container, EmptyState, buttonClass } from '../components/ui';
import { SupportCta } from '../components/SupportCta';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page not found · PG Ease Help Center';
  }, []);

  return (
    <Container className="space-y-8 py-12">
      <div className="mx-auto max-w-lg rounded-lg border border-slate-200 bg-white">
        <EmptyState
          icon={<SearchX />}
          title="We couldn't find that page"
          description="The link may be out of date, or the tutorial may have moved. Start from the Help Center home or search for what you need."
          action={
            <>
              <Link to="/" className={buttonClass('primary', 'sm')}>
                Go to Help Center
              </Link>
              <Link to="/tutorials" className={buttonClass('secondary', 'sm')}>
                All tutorials
              </Link>
            </>
          }
        />
      </div>
      <div className="mx-auto max-w-lg">
        <SupportCta compact />
      </div>
    </Container>
  );
};
