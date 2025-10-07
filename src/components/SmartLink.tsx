// hover시 코드 청크 + 데이터(loader) 선행 로드

import * as React from 'react';
import { Link, useFetcher, matchRoutes } from 'react-router-dom';
import { router } from '@/routes';

import type { To } from 'react-router-dom';
import { createPath } from 'history';

// 라우트 매칭 > 해당 element에 preload가 있으면 호출하는 util
function preloadRouteComponent(to: string) {
  const matches = matchRoutes(router.routes as any, to) ?? [];

  for (const m of matches) {
    const el: any = (m.route as any).element;
    if (el && typeof el.type?.preload === 'function') {
      el.type.preload(); // lazyPreload에서 붙인 import 미리 실행
    }
  }
}

function toHref(to: To): string | null {
  if (typeof to === 'string') return to;
  if (to && typeof to === 'object') return createPath(to as any);
  return null;
}

type Props = React.ComponentProps<typeof Link> & {
  prefetch?: 'hover' | 'visible' | 'none';
};

export function SmartLink({ prefetch, to, ...rest }: Props) {
  const fetcher = useFetcher(); // loader 데이터 미리 가져오기

  const mode: 'hover' | 'visible' | 'none' = (prefetch ?? 'hover') as
    | 'hover'
    | 'visible'
    | 'none';

  const do_prefetch = React.useCallback(() => {
    const href = toHref(to);
    if (!href) return;

    // 1. 코드 프리패치
    preloadRouteComponent(href);

    // 2. 데이터 프리패치(해당 경로의 loader 실행)
    try {
      fetcher.load(href);
    } catch {}
  }, [to, fetcher]);

  const ref = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (mode !== 'visible' || !ref.current) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          do_prefetch();
          io.disconnect();
        }
      });
    });

    io.observe(ref.current);
    return () => io.disconnect();
  }, [mode, do_prefetch]);

  return (
    <Link
      ref={ref}
      to={to}
      onMouseEnter={mode === 'hover' ? do_prefetch : undefined}
      {...rest}
    />
  );
}
