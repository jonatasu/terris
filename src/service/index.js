import axios from 'axios';

const countriesApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1/',
});

export const getAllCountryNames = async () => {
  const { data } = await countriesApi.get('all?fields=name');
  const countryNameList = data.map((country) => country.name.common);
  return countryNameList.sort();
};

export const getCountryByName = (name) => countriesApi.get(`name/${name}?fullText=true`)
  .then(({ data }) => data[0])
  .catch(() => {
    window.location.href = '/';
  });
