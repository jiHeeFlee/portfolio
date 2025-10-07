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
