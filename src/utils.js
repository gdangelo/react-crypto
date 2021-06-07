import axios from 'axios';

export const fetcher = url => axios.get(url).then(res => res.data);

export const formatCurrency = (value = 0, locale = 'en-US', currency = 'USD') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 10,
  }).format(value);

export const formatNumber = (value, fraction = 2) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  }).format(value);
