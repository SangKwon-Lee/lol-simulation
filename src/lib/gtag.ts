export const GA_TRACKING_ID = 'G-39YQSX411K';
export const pageview = (url: any) => {
  //@ts-ignore
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  });
};

export const event = ({ action, category, label, value }: any) => {
  //@ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};
