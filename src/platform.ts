export const isMobile = () => {
  return window.innerWidth < 1024;
};

export const isDesktop = () => {
  return !isMobile();
};