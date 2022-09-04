import axios from 'axios';

const countriesApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1/',
});

const sortObjListByKey = (objList, key) => objList.sort((a, b) => {
  const keyA = a[key];
  const keyB = b[key];
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
});

export const getAllCountryNames = async () => {
  const { data } = await countriesApi.get('all?fields=name,ccn3,flag');
  const countryNameList = data.map((country) => (
    {
      code: country.ccn3,
      flag: country.flag,
      commonName: country.name.common,
      officialName: country.name.official,
    }
  ));
  return sortObjListByKey(countryNameList, 'commonName');
};

export const getCountryByName = (name) => countriesApi.get(`name/${name}?fullText=true`)
  .then(({ data }) => data[0])
  .catch(() => {
    window.location.href = '/';
  });
