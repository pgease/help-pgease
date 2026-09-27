import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ChevronRight, RefreshCw, Search, X } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Small shared primitives for the Help Center (plain Tailwind, no UI lib) */
/* ------------------------------------------------------------------ */

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm',
  secondary: 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
  ghost: 'text-slate-700 hover:bg-slate-100',
};
const BUTTON_SIZES = { sm: 'h-8 px-3 text-xs', md: 'h-10 px-4', lg: 'h-11 px-5' } as const;

export function buttonClass(variant: ButtonVariant = 'primary', size: keyof typeof BUTTON_SIZES = 'md', extra = ''): string {
  return cx(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], extra);
}

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: keyof typeof BUTTON_SIZES }
> = ({ variant = 'primary', size = 'md', className, type = 'button', ...props }) => (
  <button type={type} className={buttonClass(variant, size, className)} {...props} />
);

/* Container ---------------------------------------------------------- */
export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cx('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)} {...props} />
);

/* Breadcrumbs -------------------------------------------------------- */
export interface Crumb {
  label: string;
  to?: string;
}
export const Breadcrumbs: React.FC<{ items: Crumb[] }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
    <ol className="flex flex-wrap items-center gap-1">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1 min-w-0">
            {c.to && !last ? (
              <Link to={c.to} className="hover:text-brand-700 hover:underline">
                {c.label}
              </Link>
            ) : (
              <span className={cx('truncate', last && 'text-slate-800 font-medium')} aria-current={last ? 'page' : undefined}>
                {c.label}
              </span>
            )}
            {!last ? <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden /> : null}
          </li>
        );
      })}
    </ol>
  </nav>
);

/* Search input ------------------------------------------------------- */
export const SearchInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
  onSubmit?: (v: string) => void;
  placeholder?: string;
  size?: 'md' | 'lg';
  autoFocus?: boolean;
  className?: string;
  id?: string;
}> = ({ value, onChange, onSubmit, placeholder = 'Search PG Ease help…', size = 'md', autoFocus, className, id = 'help-search' }) => (
  <form
    role="search"
    className={cx('relative', className)}
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit?.(value);
    }}
  >
    <label htmlFor={id} className="sr-only">
      Search help articles and tutorials
    </label>
    <Search className={cx('pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400', size === 'lg' ? 'h-5 w-5' : 'h-4 w-4')} aria-hidden />
    <input
      id={id}
      type="search"
      value={value}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete="off"
      className={cx(
        'w-full rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30',
        size === 'lg' ? 'h-12 pl-11 pr-11 text-base' : 'h-10 pl-10 pr-10 text-sm',
      )}
    />
    {value ? (
      <button
        type="button"
        onClick={() => onChange('')}
        aria-label="Clear search"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
      >
        <X className="h-4 w-4" />
      </button>
    ) : null}
  </form>
);

/* Empty / error / loading ------------------------------------------- */
export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}> = ({ icon, title, description, action, className }) => (
  <div role="status" className={cx('flex flex-col items-center justify-center px-6 py-12 text-center', className)}>
    {icon ? <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 [&>svg]:h-5 [&>svg]:w-5">{icon}</div> : null}
    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    {description ? <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p> : null}
    {action ? <div className="mt-4 flex flex-wrap items-center justify-center gap-2">{action}</div> : null}
  </div>
);

export const ErrorState: React.FC<{
  title?: string;
  description?: string;
  onRetry?: () => void;
  retrying?: boolean;
  className?: string;
}> = ({ title = "Couldn't load this section", description = 'Please check your connection and try again.', onRetry, retrying, className }) => (
  <div role="alert" className={cx('flex flex-col items-center justify-center px-6 py-12 text-center', className)}>
    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
      <AlertCircle className="h-5 w-5" />
    </div>
    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
    {onRetry ? (
      <Button variant="secondary" size="sm" className="mt-4" onClick={onRetry} disabled={retrying}>
        <RefreshCw className={cx('h-3.5 w-3.5', retrying && 'animate-spin')} /> Try again
      </Button>
    ) : null}
  </div>
);

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cx('animate-pulse rounded-md bg-slate-200/80', className)} aria-hidden {...props} />
);

export const CardSkeleton: React.FC = () => (
  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
    <Skeleton className="aspect-video w-full rounded-none" />
    <div className="space-y-2 p-4">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  </div>
);

/* Section heading ---------------------------------------------------- */
export const SectionHeading: React.FC<{ title: string; description?: string; action?: React.ReactNode; as?: 'h2' | 'h3' }> = ({
  title,
  description,
  action,
  as: Tag = 'h2',
}) => (
  <div className="flex flex-wrap items-end justify-between gap-3">
    <div>
      <Tag className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">{title}</Tag>
      {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
    </div>
    {action}
  </div>
);
