
import Init from '../assets/Init';
const { webUri } = Init;

const Fetch = value => fetch(webUri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(value)
  });

module.exports = Fetch;