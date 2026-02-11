import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function Shell({
  activeUseCaseId,
  activeSubRoute,
  onSelectUseCase,
  onSelectSubRoute,
  onSelectCommon,
}) {
  return (
    <>
      <Header />
      <Sidebar
        activeUseCaseId={activeUseCaseId}
        activeSubRoute={activeSubRoute}
        onSelectUseCase={onSelectUseCase}
        onSelectSubRoute={onSelectSubRoute}
        onSelectCommon={onSelectCommon}
      />
    </>
  );
}
