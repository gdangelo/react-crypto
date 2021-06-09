import axios from 'axios';

export const fetcher = url => axios.get(url).then(res => res.data);

export const formatCurrency = (value = 0, options = null) => {
  const opts = {
    currency: 'USD',
    maximumFractionDigits: 10,
    ...options,
  };

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    ...opts,
  }).format(value);
};

export const formatNumber = (value, options = null) => {
  const opts = {
    notation: 'standard',
    compactDisplay: 'long',
    maximumFractionDigits: 2,
    ...options,
  };

  return new Intl.NumberFormat('en-US', opts).format(value);
};

export const formatDate = (value, options = null) => {
  const opts = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('en-US', opts).format(value);
};

export const createMarkup = str => {
  return {
    __html: str.replace(
      /<a href="([^>]+)">(.+?)<\/a>/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
    ),
  };
};
