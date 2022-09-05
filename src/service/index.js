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

const formatCountryObj = (data) => {
  const countryNameList = data.map((country) => {
    const {
      ccn3, flag, flags, name, region,
    } = country;

    return {
      code: ccn3,
      flag,
      flags,
      commonName: name.common,
      officialName: name.official,
      region,
    };
  });
  return sortObjListByKey(countryNameList, 'commonName');
};

export const getAllCountry = async () => {
  const { data } = await countriesApi.get('all?fields=name,ccn3,flag,flags,region');
  return formatCountryObj(data);
};

export const getCountryByCode = async (codes) => {
  const { data } = await countriesApi.get(`alpha?fields=name,ccn3,flag,flags,region&codes=${codes}`);
  return formatCountryObj(data);
};

export const getCountryByName = (name) => countriesApi.get(`name/${name}?fullText=true`)
  .then(({ data }) => data[0])
  .catch(() => {
    window.location.href = '/';
  });
