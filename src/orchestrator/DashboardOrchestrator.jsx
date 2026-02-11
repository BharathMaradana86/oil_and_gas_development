import React from 'react';
import { motion } from 'framer-motion';
import { getComponent } from '../config/componentMap';
import { usePlatform } from '../context/PlatformContext';
import CommonPage from '../pages/CommonPage';
import styles from './DashboardOrchestrator.module.css';

const pageVariants = {
  initial: { opacity: 0, x: 8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
};

const pageTransition = { type: 'tween', duration: 0.2 };

export function DashboardOrchestrator({ useCaseId, subRoute, onSelectUseCase }) {
  const platform = usePlatform();
  const Component = useCaseId ? getComponent(useCaseId, subRoute) : null;

  if (!useCaseId) {
    return (
      <motion.div
        className={styles.wrapper}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <CommonPage onSelectUseCase={onSelectUseCase} />
      </motion.div>
    );
  }

  if (!Component) {
    return (
      <motion.div
        className={styles.placeholder}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <p className={styles.error}>Page not found.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.wrapper}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <Component useCaseId={useCaseId} subRoute={subRoute} platform={platform} />
    </motion.div>
  );
}
